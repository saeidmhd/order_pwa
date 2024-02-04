import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInformationComponent } from './user-information/user-information.component'; // Import the component

const routes: Routes = [
  { path: 'user-information', component: UserInformationComponent },
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
