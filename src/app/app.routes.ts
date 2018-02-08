import { AddExistingComponent } from './add-existing';
import { AddNewComponent } from './add-new';
import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { SearchComponent } from './search';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import { KeeperComponent } from './keeper/keeper.component';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'add-existing',  component: AddExistingComponent },
  { path: 'add-new',  component: AddNewComponent },
  { path: 'keeper/:keeper',  component: KeeperComponent },
  { path: '**',    component: NoContentComponent },
];
