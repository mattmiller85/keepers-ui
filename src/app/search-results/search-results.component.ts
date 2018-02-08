import { Subscription } from 'rxjs/Rx';
import {
  Component,
  OnInit
} from '@angular/core';
import * as moment from 'moment';
import { KeepersWSService } from '../keepers-ws/keepers-ws.service';
import {
  SearchRequestMessage,
  SearchResultsMessage
} from '../../../../keepers-server/src/core/messages';
import { IDocumentResult } from '../../../../keepers-server/src/core/document';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'search-results',
  styleUrls: [ './search-results.component.css' ],
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public results: IDocumentResult[] = [];
  public formattedDate = moment;
  private sub: Subscription;
  private updateSub: Subscription;
  private deleteSub: Subscription;

  constructor(private client: KeepersWSService) { }

  public ngOnInit() {
    this.sub = this.client.searchFinished.subscribe(results => {
      this.results = results.results;
    });
    this.deleteSub = this.client.keeperDeleted.subscribe(msg => {
      msg.keeperIds.forEach(delid => {
        const resultsIndex = this.results.findIndex(doc => doc.id === delid);
        if (resultsIndex > -1) {
          this.results.splice(resultsIndex, 1);
        }
      });
    });
    this.updateSub = this.client.keeperUpdated.subscribe(msg => {
      // I feel like really there should be something here
    });
  }

  public ngOnDestroy() {
      this.sub.unsubscribe();
      this.deleteSub.unsubscribe();
      this.updateSub.unsubscribe();
  }
}
