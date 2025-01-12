import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CreateElectionComponent } from './components/create-election/create-election.component';
import { UpdateElectionComponent } from './components/update-election/update-election.component';
import { ViewElectionsComponent } from './components/view-elections/view-elections.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: 'create-election', component: CreateElectionComponent },
      { path: 'update-election', component: UpdateElectionComponent },
      { path: 'view-elections', component: ViewElectionsComponent },
    ],
  },
];
