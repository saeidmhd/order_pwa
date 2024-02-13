import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/modules/login/login.component'; // Import the component
import { PeopleListComponent } from './shared/modules/people-list/people-list.component';
import { DashboardComponent } from './shared/modules/dashboard/dashboard.component';
import { BasicInfoComponent } from './shared/modules/basic-info/basic-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'people-list', component: PeopleListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'basic-info', component: BasicInfoComponent },

  // other routes...
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
