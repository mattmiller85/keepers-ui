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

@Component({
  selector: 'add-new',
  styleUrls: [ './add-new.component.css' ],
  templateUrl: './add-new.component.html'
})
export class AddNewComponent implements OnInit, OnDestroy {

  public selectedKeepers: string[];
  public tags: string;
  public sources: string[];

  constructor(private client: KeepersWSService, private route: ActivatedRoute) { }

  public addKeepers() {
    // might have to save them here

    this.client.addKeepers(this.selectedKeepers, this.tags);
  }

  public ngOnInit() {
    this.selectedKeepers = new Array<string>();
  }

  public ngOnDestroy() {

  }
}
