/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" [routerLink]=" ['./home'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Home
        </a>
        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#keepers-nav" aria-controls="keepers-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="keepers-nav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" [routerLink]=" ['./add-new'] "
                routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
                Add From Scanner
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" [routerLink]=" ['./add-existing'] "
                routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
                Add Previously Scanned
              </a>
            </li>
          </ul>
          <search></search>
        </div>
      </nav>
    </header>
    <div class="container-fluid">
      <div class="row">
        <search-results selected="keeperSelected"></search-results>
      </div>
    </div>
    <main role="main" class="col-sm-9 ml-sm-auto col-md-10 pt-3">
      <router-outlet></router-outlet>
    </main>
    <keepers-footer></keepers-footer>
  `
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angular-electron.svg';
  public name = 'Keepers!';
  public url = 'https://github.com/mattmiller85/keepers-ui';

  constructor() { }

  public ngOnInit() {

  }
}
