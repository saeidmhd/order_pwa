import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { tap } from 'rxjs';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/login';

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  login(username: string, password: string) {
    const hashedPassword = CryptoJS.MD5(password).toString(); // Hash the password
    const requestBody = {
      username: username,
      password: hashedPassword
    };

    return this.http.post(this.apiUrl, requestBody).pipe(
      // Store the response in IndexedDB before returning it
      tap((response) => {
        this.indexedDbService['storeLoginResponse'](response);
      })
    );
  }
}
