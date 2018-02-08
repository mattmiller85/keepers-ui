import { Subscription } from 'rxjs/Rx';
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { KeepersWSService } from '../keepers-ws/keepers-ws.service';
import { IDocument } from '../../../../keepers-server/src/core/document';
import { ISearchResults } from '../../../../keepers-server/src/searcher';
import { SearchRequestMessage } from '../../../../keepers-server/src/core/messages';

@Component({
  selector: 'keeper',
  styleUrls: [ './keeper.component.css' ],
  templateUrl: './keeper.component.html'
})
export class KeeperComponent implements OnInit, OnDestroy {

  public formattedDate = moment;
  public imageSrc: string;

  private parmSub: Subscription;
  private resultsSub: Subscription;
  private deleteSub: Subscription;
  private updateSub: Subscription;
  private keeper: IDocument;

  constructor(private client: KeepersWSService, private route: ActivatedRoute) { }

  public saveKeeper() {
    this.client.updateTags([this.keeper.id], this.keeper.tags);
  }

  public removeKeeper() {
    this.client.deleteKeeper([this.keeper.id]);
  }

  public ngOnInit() {
    this.parmSub = this.route.params.subscribe(params => {
      this.resultsSub = this.client.gotKeeper.subscribe((result) => {
        this.keeper = result;
        this.imageSrc = `data:image/png;base64,${this.keeper.image_enc}`;
      });
      this.client.searchDocuments(new SearchRequestMessage({ documentId: params['keeper'] }));
    });
    this.deleteSub = this.client.keeperDeleted.subscribe((msg) => {
      if (msg.keeperIds.indexOf(this.keeper.id) > 0) {
        debugger;
        this.keeper = null;
      }
    });
    this.updateSub = this.client.keeperUpdated.subscribe((msg) => {
      if (msg.keeperIds.indexOf(this.keeper.id) > 0) {
        // probably do something here
      }
    });
  }

  public ngOnDestroy() {
    this.parmSub.unsubscribe();
    this.updateSub.unsubscribe();
    this.deleteSub.unsubscribe();
    if (this.resultsSub) {
      this.resultsSub.unsubscribe();
    }
  }
}
