// banks.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';

import { IndexedDbService } from './indexed-db.service';
import { BanksResponse } from '../models/Bank'; // Import your BanksResponse interface

@Injectable({
  providedIn: 'root'
})
export class BanksService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata'; // replace with your API endpoint

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getBanks(): Observable<BanksResponse> { 
    const token = this.indexedDbService.getToken(); // replace any with your BanksResponse interface
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      FromBankVersion: 0
    };

    return this.http.post<BanksResponse>(this.apiUrl, body, { headers }).pipe(
      tap((response) => {
        if (response.Result) {
          // Successful request
          this.indexedDbService.storeBanks(response.Data.Objects.Banks) // You need to implement this method in IndexedDbService
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
  }
}
