import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

import { IndexedDbService } from './indexed-db.service';
import { OrdersResponse } from '../models/order'; // Import the OrdersResponse interface

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata'; // Replace with your API URL

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getOrders(): Observable<OrdersResponse> {
    
    return from(this.indexedDbService.getMaxRowVersion('orderStore')).pipe( // Replace 'orderStore' with the name of your IndexedDB store for orders
      switchMap(fromOrderVersion => {
        const token = this.indexedDbService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const body = { fromOrderVersion };

        return this.http.post<OrdersResponse>(this.apiUrl, body, { headers }).pipe(
          tap((response) => {
            if (response.Result) {
              // Successful request
              this.indexedDbService.storeOrders(response.Data.Objects.Orders) // Replace 'storeOrders' with your method for storing orders in IndexedDB
                .then(() => console.log('Orders data stored in IndexedDB'))
                .catch((error: any) => console.error('Error storing orders data:', error));
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
