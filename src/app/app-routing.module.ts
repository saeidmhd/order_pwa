import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/modules/login/login.component'; // Import the component
import { PeopleListComponent } from './shared/modules/people-list/people-list.component';
import { DashboardComponent } from './shared/modules/dashboard/dashboard.component';
import { BasicInfoComponent } from './shared/modules/basic-info/basic-info.component';
import { UpdateInfoComponent } from './shared/modules/update-info/update-info.component';
import { BankListComponent } from './shared/modules/bank-list/bank-list.component';
import { ProductListComponent } from './shared/modules/product-list/product-list.component';
import { ProductDetailListComponent } from './shared/modules/product-detail-list/product-detail-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'people-list', component: PeopleListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'basic-info', component: BasicInfoComponent },
  { path: 'update-info', component: UpdateInfoComponent },
  { path: 'bank-list', component: BankListComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-detail-list', component: ProductDetailListComponent },

  // other routes...
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
