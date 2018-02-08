import {
  Component,
  OnInit
} from '@angular/core';

import { Title } from './title';

@Component({
  selector: 'home',
  providers: [
    Title
  ],
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(
    public title: Title
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
  }
}
