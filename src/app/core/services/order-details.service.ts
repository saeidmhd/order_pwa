import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

import { IndexedDbService } from './indexed-db.service';
import { OrderDetailsResponse } from '../models/order-detail'; // Import the OrderDetailsResponse interface

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata'; // Replace with your API URL

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getOrderDetails(): Observable<OrderDetailsResponse> {
    
    return from(this.indexedDbService.getMaxRowVersion('orderDetailStore')).pipe( // Replace 'orderDetailStore' with the name of your IndexedDB store for order details
      switchMap(fromOrderDetailVersion => {
        const token = this.indexedDbService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const body = { fromOrderDetailVersion };

        return this.http.post<OrderDetailsResponse>(this.apiUrl, body, { headers }).pipe(
          tap((response) => {
            if (response.Result) {
              // Successful request
              console.log("order details = ", response.Data.Objects.OrderDetails)
              this.indexedDbService.storeOrderDetails(response.Data.Objects.OrderDetails) // Replace 'storeOrderDetails' with your method for storing order details in IndexedDB
                .then(() => console.log('Order details data stored in IndexedDB'))
                .catch((error: any) => console.error('Error storing order details data:', error));
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
