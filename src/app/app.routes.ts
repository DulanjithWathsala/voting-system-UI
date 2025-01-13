import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CreateElectionComponent } from './components/create-election/create-election.component';
import { ViewElectionsComponent } from './components/view-elections/view-elections.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BallotsComponent } from './components/ballots/ballots.component';
import { CreateCandidateComponent } from './components/create-candidate/create-candidate.component';
import { ManageCandidatesComponent } from './components/manage-candidates/manage-candidates.component';

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
    path: 'ballots',
    component: BallotsComponent,
  },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: 'create-election', component: CreateElectionComponent },
      { path: 'view-elections', component: ViewElectionsComponent },
      { path: 'create-candidate', component: CreateCandidateComponent },
      { path: 'manage-candidates', component: ManageCandidatesComponent },
    ],
  },
];
