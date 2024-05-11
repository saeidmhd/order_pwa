import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component'; // Import the component
import { PeopleListComponent } from './shared/components/people-list/people-list.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { BasicInfoComponent } from './shared/components/basic-info/basic-info.component';
import { BankListComponent } from './shared/components/bank-list/bank-list.component';
import { ProductListComponent } from './shared/components/product-list/product-list.component';
import { OrderListComponent } from './shared/components/order-list/order-list.component';
import { ProductCategoriesComponent } from './shared/components/product-categories/product-categories.component';
import { OrderDetailComponent } from './shared/components/order-detail/order-detail.component';
import { InvoiceComponent } from './shared/components/invoice/invoice.component';
import { authGuard } from './core/services/authorizing/auth.guard';
import { GetBazaraDataComponent } from './shared/components/get-bazara-data/get-bazara-data.component';
import { ProductComponent } from './shared/components/product/product.component';
import { MapComponent } from './shared/components/map/map.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'people-list', component: PeopleListComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'basic-info', component: BasicInfoComponent, canActivate: [authGuard] },
  { path: 'map', component: MapComponent, canActivate: [authGuard] },
  { path: 'update-info', component: GetBazaraDataComponent, canActivate: [authGuard] },
  { path: 'bank-list', component: BankListComponent, canActivate: [authGuard] },
  { path: 'product', component: ProductComponent, canActivate: [authGuard] },
  { path: 'product-list', component: ProductListComponent, canActivate: [authGuard] },
  { path: 'product-list/:categoryId', component: ProductListComponent, canActivate: [authGuard] }, 
  { path: 'order-list', component: OrderListComponent, canActivate: [authGuard] },
  { path: 'product-categories', component: ProductCategoriesComponent, canActivate: [authGuard] },
  { path: 'invoice', component: InvoiceComponent, canActivate: [authGuard] },
  { path: 'order-detail/:id', component: OrderDetailComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' },
  
  // other routes...
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
