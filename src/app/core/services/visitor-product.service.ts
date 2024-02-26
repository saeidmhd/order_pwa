import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

import { IndexedDbService } from './indexed-db.service';
import { VisitorProduct, VisitorProductsResponse } from '../models/visitor-product';

@Injectable({
  providedIn: 'root'
})
export class VisitorProductService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata'; // Replace with your API URL

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getVisitorProducts(): Observable<VisitorProductsResponse> {
    return from(this.indexedDbService.getMaxRowVersion('visitorProductStore')).pipe(
      switchMap(fromVisitorProductVersion => {
        const token = this.indexedDbService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const body = { fromVisitorProductVersion };

        return this.http.post<VisitorProductsResponse>(this.apiUrl, body, { headers }).pipe(
          tap((response) => {
            if (response.Result) {
              // Successful request
              this.indexedDbService.storeVisitorProducts(response.Data.Objects.VisitorProducts)
                .then(() => console.log('VisitorProducts data stored in IndexedDB'))
                .catch((error: any) => console.error('Error storing VisitorProducts data:', error));
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
