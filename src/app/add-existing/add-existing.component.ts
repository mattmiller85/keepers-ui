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
  selector: 'add-existing',
  styleUrls: [ './add-existing.component.css' ],
  templateUrl: './add-existing.component.html'
})
export class AddExistingComponent implements OnInit, OnDestroy {

  public selectedKeepers: FileList;

  public tags: string;

  constructor(private client: KeepersWSService, private route: ActivatedRoute) { }

  public setFiles(event) {
    this.selectedKeepers = event.target.files as FileList;
  }

  public addKeepers() {
    this.client.addKeepers(Array.from(this.selectedKeepers).map(k => k.path), this.tags);
  }

  public ngOnInit() {
    
  }

  public ngOnDestroy() {
   
  }
}
