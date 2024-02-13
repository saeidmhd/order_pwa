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

import { IndexedDbService } from './core/services/indexed-db.service';
import { LoginService } from './core/services/login.service';
import { LoginComponent } from './shared/modules/login/login.component'; // Import the component
import { AppComponent } from './shared/components/app.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { PeopleListComponent } from './shared/modules/people-list/people-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DashboardComponent } from './shared/modules/dashboard/dashboard.component';
import { BasicInfoComponent } from './shared/modules/basic-info/basic-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PeopleListComponent,
    DashboardComponent,
    BasicInfoComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [LoginService, IndexedDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
