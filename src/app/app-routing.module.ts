import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInformationComponent } from './user-information/user-information.component';
import { LoginComponent } from './login/login.component'; // Import the component
import { PeopleListComponent } from './people-list/people-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user-information', component: UserInformationComponent },
  { path: 'people-list', component: PeopleListComponent },
  // other routes...
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
