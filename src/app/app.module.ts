import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { HomeComponent } from './home';
import { SearchComponent } from './search';
import { NoContentComponent } from './no-content';
import { KeepersFooterComponent } from './keepers-footer/keepers-footer.component';
import { XLargeDirective } from './home/x-large';

import '../styles/styles.scss';
import '../styles/headings.scss';
import { KeepersWSService } from './keepers-ws/keepers-ws.service';
import { SearchResultsComponent } from './search-results/search-results.component';
import { KeeperComponent } from './keeper/keeper.component';
import { AddExistingComponent } from './add-existing/index';
import { AddNewComponent } from './add-new/index';

declare const ENV: string;

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  { provide: APP_BASE_HREF, useValue : '/' },
  KeepersWSService
];

let CONDITIONAL_IMPORTS = [];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultsComponent,
    HomeComponent,
    KeeperComponent,
    AddExistingComponent,
    AddNewComponent,
    KeepersFooterComponent,
    NoContentComponent,
    XLargeDirective
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    ...CONDITIONAL_IMPORTS
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef
  ) {}
}
