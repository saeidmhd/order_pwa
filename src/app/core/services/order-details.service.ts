import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

import { IndexedDbService } from './indexed-db.service';
import { GetOrderDetailsResponse } from '../models/order-detail'; // Import the OrderDetailsResponse interface
import { SaveResponse } from '../models/save-response';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata'; // Replace with your API URL
  private saveUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/SaveAllData'; // URL for saving data

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getOrderDetails(): Observable<GetOrderDetailsResponse> {
    
    return from(this.indexedDbService.getMaxRowVersion('orderDetailStore')).pipe( // Replace 'orderDetailStore' with the name of your IndexedDB store for order details
      switchMap(fromOrderDetailVersion => {
        const token = this.indexedDbService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const body = { fromOrderDetailVersion };

        return this.http.post<GetOrderDetailsResponse>(this.apiUrl, body, { headers }).pipe(
          tap((response) => {
            if (response.Result) {
              // Successful request
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

  saveOrderDetails(): Observable<SaveResponse> {
    return from(this.indexedDbService.getOrderDetailsWithZeroRowVersion()).pipe(
      switchMap(orderDetails => {
        const token = this.indexedDbService.getToken();
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json; charset=utf8'); // Set Content-Type header
        const body = { orderDetails };
        const replacer = (key: any, value: number) => (key === 'OrderDetailId' || key === 'OrderId' || value === 0) ? undefined : value;
        const jsonBody = JSON.stringify(body, replacer);

        return this.http.post<SaveResponse>(this.saveUrl, jsonBody, { headers }).pipe(
          tap(async (response) => {
            if (response.Result && response.Data.Objects.OrderDetails.Results) {
              // Update orders in IndexedDB
              for (const result of response.Data.Objects.OrderDetails.Results) {
                if (result.Result) {
                  const orderDetailIndex = orderDetails.findIndex(orderDetail => orderDetail.OrderDetailClientId === result.EntityClientId);
                  if (orderDetailIndex !== -1) {
                    //orderDetails[orderDetailIndex].OrderDetailId = result.EntityId;
                    //orderDetails[orderDetailIndex].OrderDetailClientId = result.EntityClientId;
                    orderDetails[orderDetailIndex].RowVersion = result.RowVersion;
                    await this.indexedDbService.updateOrderDetail(orderDetails[orderDetailIndex].OrderDetailClientId, orderDetails[orderDetailIndex]);
                  }
                }
              }
            } else {
              // Failed request
              console.error('Request error:', response);
            }
          }),
          catchError(error => {
            console.error('Request error:', error);
            throw error;
          })
        );
      })
    );
  }
}
