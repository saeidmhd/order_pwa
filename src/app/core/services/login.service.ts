import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { tap, catchError } from 'rxjs/operators';
import { IndexedDbService } from './indexed-db.service';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginError, LoginModel } from '../models/login-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/login';

  constructor(
    private http: HttpClient,
    private indexedDbService: IndexedDbService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(username: string, password: string): Observable<LoginModel | LoginError> {
    const hashedPassword = CryptoJS.MD5(password).toString();
    const requestBody = {
      username: username,
      password: hashedPassword
    };

    return this.http.post<any>(this.apiUrl, requestBody).pipe(
      tap((response) => {
        if (response.Result) {
          this.indexedDbService.storeLoginResponse(response.Data)
            .then(() => {
              this.router.navigate(['/dashboard']);
            })
            .catch((error) => console.error('Error storing login response:', error));
        } else {
          console.error('Login error:', response.Message);
          this.snackBar.open(response.Message, 'بستن', {
            duration: 5000,
            verticalPosition: 'top'
          });
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        let errorMessage = 'An unexpected error occurred!';
        if (error.status === 0) {
          errorMessage = 'اتصال اینترنت خود را بررسی بفرمایید، سپس دوباره تلاش کنید!';
        }
        this.snackBar.open(errorMessage, 'بستن', {
          duration: 5000,
          verticalPosition: 'top'
        });
        return of({ Result: false, Message: errorMessage, Data: {} });
      })
    );
  }
}