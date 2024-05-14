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


import { LoginComponent } from './shared/components/login/login.component'; // Import the component
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PeopleListComponent } from './shared/components/people-list/people-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { BasicInfoComponent } from './shared/components/basic-info/basic-info.component';
import { BankListComponent } from './shared/components/bank-list/bank-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductListComponent } from './shared/components/product-list/product-list.component';
import { OrderListComponent } from './shared/components/order-list/order-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductCategoriesComponent } from './shared/components/product-categories/product-categories.component';
import { OrderDetailComponent } from './shared/components/order-detail/order-detail.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { LogUpdateService } from './core/services/pwa_services/log-update.service';
import { PromptUpdateService } from './core/services/pwa_services/prompt-update.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';


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
import { MapComponent } from './shared/components/map/map.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './shared/components/product/product.component';
import { ProductCardComponent } from './shared/components/product/product-card/product-card.component';
import { MiniReportComponent } from './shared/components/dashboard/mini-report/mini-report.component';
import { MissionComponent } from './shared/components/dashboard/mission/mission.component';
import { OperationSectionComponent } from './shared/components/dashboard/operation-section/operation-section.component';
import { MissionCardComponent } from './shared/components/dashboard/mission/mission-card/mission-card.component';
import { RialCurrencyPipe } from './rial-currency.pipe';
import { BottomSheetCategoryComponent } from './shared/components/product/bottom-sheet-category/bottom-sheet-category.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PeopleListComponent,
    DashboardComponent,
    BasicInfoComponent,
    BankListComponent,
    ProductComponent,
    ProductCardComponent,
    ProductListComponent,
    ProductCategoriesComponent,
    OrderListComponent,
    OrderDetailComponent,
    ToolbarComponent,
    UpdateConfirmationDialogComponent,
    InvoiceComponent,
    FooterComponent,
    DrawerComponent,
    MapComponent,
    MiniReportComponent,
    MissionComponent,
    OperationSectionComponent,
    MissionCardComponent,
    RialCurrencyPipe,
    BottomSheetCategoryComponent,
  ],
  exports: [
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
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
    MatChipsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    // LoginService, IndexedDbService, 
    LogUpdateService, PromptUpdateService],
  bootstrap: [AppComponent]
})
export class AppModule { }