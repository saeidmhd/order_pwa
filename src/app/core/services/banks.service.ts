// banks.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

import { IndexedDbService } from './indexed-db.service';
import { BanksResponse } from '../models/Bank';

@Injectable({
  providedIn: 'root'
})
export class BanksService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata';

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getBanks(): Observable<BanksResponse> {
    return from(this.indexedDbService.getMaxRowVersion('bankStore')).pipe(
      switchMap(fromBankVersion => {
        const token = this.indexedDbService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const body = { fromBankVersion };

        return this.http.post<BanksResponse>(this.apiUrl, body, { headers }).pipe(
          tap((response) => {
            if (response.Result) {
              // Successful request
              console.log("banks = " , response.Data.Objects.Banks)
              this.indexedDbService.storeBanks(response.Data.Objects.Banks)
                .then(() => console.log('Banks data stored in IndexedDB'))
                .catch((error: any) => console.error('Error storing banks data:', error));
            } else {
              // Failed request
              console.error('Request error:', response);
            }
          }),
          catchError((error) => {
            console.error('Request error:', error);
            throw error;
          })
        );
      })
    );
  }
}
