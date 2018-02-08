import { Subscription } from 'rxjs/Rx';
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeepersWSService } from '../keepers-ws/keepers-ws.service';

@Component({
  selector: 'keepers-footer',
  styleUrls: [ './keepers-footer.component.css' ],
  templateUrl: './keepers-footer.component.html'
})

export class KeepersFooterComponent implements OnInit, OnDestroy {

  public connectionStatus: string;
  public messageNotification: string;

  private notifySub: Subscription;
  private messageSub: Subscription;

  constructor(private client: KeepersWSService) { }

  public ngOnInit() {
    this.notifySub = this.client.connectionNotification.subscribe(n => {
      this.connectionStatus = n.text;
    });

    this.messageSub = this.client.messageNotification.subscribe(n => {
      this.messageNotification = n.text;
    });
  }

  public ngOnDestroy() {
    this.notifySub.unsubscribe();
    this.messageSub.unsubscribe();
  }
}
