import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/modules/login/login.component'; // Import the component
import { PeopleListComponent } from './shared/modules/people-list/people-list.component';
import { DashboardComponent } from './shared/modules/dashboard/dashboard.component';
import { BasicInfoComponent } from './shared/modules/basic-info/basic-info.component';
import { UpdateInfoComponent } from './shared/modules/update-info/update-info.component';
import { BankListComponent } from './shared/modules/bank-list/bank-list.component';
import { ProductListComponent } from './shared/modules/product-list/product-list.component';
import { OrderListComponent } from './shared/modules/order-list/order-list.component';
import { ProductCategoriesComponent } from './shared/modules/product-categories/product-categories.component';
import { OrderDetailComponent } from './shared/modules/order-detail/order-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'people-list', component: PeopleListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'basic-info', component: BasicInfoComponent },
  { path: 'update-info', component: UpdateInfoComponent },
  { path: 'bank-list', component: BankListComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-list/:categoryId', component: ProductListComponent }, 
  { path: 'order-list', component: OrderListComponent },
  { path: 'product-categories', component: ProductCategoriesComponent },
  { path: 'order-detail/:id', component: OrderDetailComponent },

  // other routes...
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
