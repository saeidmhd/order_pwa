import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { tap, catchError } from 'rxjs/operators';
import { IndexedDbService } from './indexed-db.service';
import { LoginModel } from './login-model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/login';

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService, private router: Router) {}

  login(username: string, password: string): Observable<LoginModel> {
    const hashedPassword = CryptoJS.MD5(password).toString();
    const requestBody = {
      username: username,
      password: hashedPassword
    };

    return this.http.post<LoginModel>(this.apiUrl, requestBody).pipe(
      tap((response) => {
        this.indexedDbService.storeLoginResponse(response.Data)
          .then(() => {
            console.log('Login response stored in IndexedDB');
            this.router.navigate(['/user-information']); // Navigate on successful login
          })
          .catch((error) => console.error('Error storing login response:', error));
      }),
      catchError((error) => {
        console.error('Login error:', error);
        // Handle the error appropriately
        if (error.status) { // Check for HTTP status code errors
          switch (error.status) {
            case 401: // Unauthorized
              return of({ Result: false, Message: 'Invalid username or password!', Data: {} as LoginModel['Data'] });
            case 400: // Bad Request
              return of({ Result: false, Message: 'Invalid login request!', Data: {} as LoginModel['Data'] });
            default:
              return of({ Result: false, Message: 'An unexpected error occurred!', Data: {} as LoginModel['Data'] });
          }
        } else {
          return of({ Result: false, Message: 'Connection error! Please try again later.', Data: {} as LoginModel['Data'] });
        }
      })
    );
  }
}
