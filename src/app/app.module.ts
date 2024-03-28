import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';



import { IndexedDbService } from './core/services/indexed-db.service';
import { LoginService } from './core/services/login.service';
import { LoginComponent } from './shared/components/login/login.component'; // Import the component
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PeopleListComponent } from './shared/components/people-list/people-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { BasicInfoComponent } from './shared/components/basic-info/basic-info.component';
import { UpdateInfoComponent } from './shared/components/update-info/update-info.component';
import { PeopleService } from './core/services/people.service';
import { BanksService } from './core/services/banks.service';
import { BankListComponent } from './shared/components/bank-list/bank-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductDetailService } from './core/services/product-detail.service';
import { ProductService } from './core/services/product.service';
import { ProductListComponent } from './shared/components/product-list/product-list.component';
import { VisitorPeopleService } from './core/services/visitor-person.service';
import { OrdersService } from './core/services/order.service';
import { OrderListComponent } from './shared/components/order-list/order-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductCategoriesComponent } from './shared/components/product-categories/product-categories.component';
import { OrderDetailComponent } from './shared/components/order-detail/order-detail.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { LogUpdateService } from './core/services/log-update.service';
import { PromptUpdateService } from './core/services/prompt-update.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';


import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { UpdateConfirmationDialogComponent } from './shared/components/update-confirmation-dialog/update-confirmation-dialog.component';
import { InvoiceComponent } from './shared/components/invoice/invoice.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DrawerComponent } from './shared/components/drawer/drawer.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PeopleListComponent,
    DashboardComponent,
    BasicInfoComponent,
    UpdateInfoComponent,
    BankListComponent,
    ProductListComponent,
    ProductCategoriesComponent,
    OrderListComponent,
    OrderDetailComponent,
    ToolbarComponent,
    UpdateConfirmationDialogComponent,
    InvoiceComponent,
    FooterComponent,
    DrawerComponent
  ],
  exports: [
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatSelectModule,
    MatTableModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [LoginService, IndexedDbService, PeopleService, BanksService, ProductDetailService, ProductService, VisitorPeopleService, OrdersService, LogUpdateService, PromptUpdateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
