import { Injectable } from '@angular/core';
import { ReadyState } from '@angular/http';
import { Observable, Subject, Subscription } from 'rxjs/Rx';
import * as fs from 'fs';
import {
  SearchRequestMessage,
  SearchResultsMessage,
  MessageType,
  SearchResultsType, 
  UpdateTagsMessage,
  DeleteMessage,
  QueueForIndexingMessage} from '../../../../keepers-server/src/core/messages';
import { ISearchResults } from '../../../../keepers-server/src/searcher';
import { IDocumentResult, IDocument } from '../../../../keepers-server/src/core/document';

export interface INotification {
  text: string;
  type: string;
  data: any;
  actions: Array < {
    action: (parms) => any,
    text: string
  } >;
}

@Injectable()
export class KeepersWSService {

  public searchFinished: Subject < ISearchResults > = new Subject();
  public gotKeeper: Subject < IDocumentResult > = new Subject();
  public keeperUpdated: Subject < UpdateTagsMessage > = new Subject();
  public keeperDeleted: Subject < DeleteMessage > = new Subject();

  public connectionNotification: Subject < INotification > = new Subject();
  public messageNotification: Subject < INotification > = new Subject();

  private wsUrl: string = 'ws://wineight:8999';
  private ws: WebSocket;
  private batched: string[] = [];

  constructor() {
    this.configureSocket();
  }

  public async addKeepers(keeperFilePaths: string[], tags: string): Promise<any> {
    let msg = new QueueForIndexingMessage({});
    let promises = [];
    keeperFilePaths.forEach((path) => {
      promises.push(new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'base64' }, (err, data) => {
          msg.document = { image_enc: data, tags };
          this.batchOrSendMessage(JSON.stringify(msg));
          resolve();
        });
      }));
    });
    return Promise.all(promises);
  }

  public searchDocuments(searchMessage) {
    this.batchOrSendMessage(JSON.stringify(searchMessage));
  }

  public updateTags(keeperIds: string[], tags: string) {
    const message = new UpdateTagsMessage({});
    message.keeperIds = keeperIds;
    message.tags = tags;
    this.batchOrSendMessage(JSON.stringify(message));
  }

  public deleteKeeper(keeperIds: string[]) {
    const message = new DeleteMessage({});
    message.keeperIds = keeperIds;
    this.batchOrSendMessage(JSON.stringify(message));
  }

  private batchOrSendMessage(jsonStringMessage: string) {
    if (this.ws.readyState !== ReadyState.Open) {
      this
        .batched
        .push(jsonStringMessage);
    } else {
      this
        .ws
        .send(jsonStringMessage);
    }
  }

  private handleMessage(msg: MessageEvent) {
    let messageObj = JSON.parse(msg.data);
    switch (messageObj.type) {
      case MessageType.search_results:
        this.handleSearchResultMessage(messageObj as SearchResultsMessage);
        break;
      case MessageType.update_tags:
        this.keeperUpdated.next(messageObj as UpdateTagsMessage);
        break;
      case MessageType.remove_document:
        this.keeperDeleted.next(messageObj as DeleteMessage);
        break;
      default:
        this
          .messageNotification
          .next({
            text: `Unhandled message received: ${MessageType[messageObj.type]}`,
            type: 'warning',
            data: messageObj,
            actions: []
          });
    }
  }

  private handleSearchResultMessage(message: SearchResultsMessage) {
    let messageText = '';

    if (message.resultsType === SearchResultsType.Search) {
      this
        .searchFinished
        .next(message.results);
      messageText = `Found ${
        message.results.results.length} results in ${message.results.tookMs} ms.`;
    } else if (message.resultsType === SearchResultsType.Single) {
      this
        .gotKeeper
        .next(message.results.results[0]);
      messageText = `Got keeper with id ${
        message.results.results[0].id}.`;
    }

    this
      .messageNotification
      .next({
        text: messageText,
        type: 'info',
        data: message,
        actions: []
      });
  }

  private configureSocket() {
    this.ws = new WebSocket(this.wsUrl);
    this.ws.onmessage = (msg: MessageEvent) => {
      this.handleMessage(msg);
    };
    this.ws.onclose = () => {
      this
        .connectionNotification
        .next({
          text: `Connection to ${this.wsUrl} lost...`,
          type: 'error',
          data: null,
          actions: [
            {
              action: (parms) => this.configureSocket(),
              text: 'Retry'
            }
          ]
        });
    };
    this.ws.onopen = (e: MessageEvent) => {
      this
        .batched
        .forEach(m => {
          this
            .ws
            .send(m);
        });
      this
        .connectionNotification
        .next({
          text: `Connected to ${this.wsUrl}`,
          type: 'info',
          data: null,
          actions: [
            {
              action: () => {
                this.wsUrl = prompt('Enter address');
                this.configureSocket();
              },
              text: 'Change Server'
            }
          ]
        });
    };
  }
}
