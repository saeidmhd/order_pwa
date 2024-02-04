import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { IndexedDbService } from './indexed-db.service';
import { LoginService } from './login.service';
import { UserInformationComponent } from './user-information/user-information.component'; // Import the component

@NgModule({
  declarations: [
    AppComponent,
    UserInformationComponent, // Declare the component
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [LoginService, IndexedDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
