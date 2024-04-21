import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

import { IndexedDbService } from './indexed-db.service';
import { OrdersResponse } from '../models/order';
import { SaveResponse } from '../models/save-response';




@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl =  'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata'; // Replace with your API URL
  private saveUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/SaveAllData'; // URL for saving data

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) { }

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

  saveOrders(): Observable<SaveResponse> {
    return from(this.indexedDbService.getOrdersWithZeroRowVersion()).pipe(
      switchMap(orders => {
        const token = this.indexedDbService.getToken();
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json; charset=utf8'); // Set Content-Type header
        const body = { orders };
        const replacer = (key: any, value: number) => (key === 'OrderId' || value === 0) ? undefined : value;
        const jsonBody = JSON.stringify(body, replacer);
  
        return this.http.post<SaveResponse>(this.saveUrl, jsonBody, { headers }).pipe(
          tap(async (response) => {
            if (response.Result && response.Data.Objects.Orders.Results) {
              // Update orders in IndexedDB
              for (const result of response.Data.Objects.Orders.Results) {
                if (result.Result) {
                  const orderIndex = orders.findIndex(order => order.OrderClientId === result.EntityClientId);
                  if (orderIndex !== -1) {
                    //orders[orderIndex].OrderId = result.EntityId;
                    //orders[orderIndex].OrderClientId = result.EntityClientId;
                    orders[orderIndex].RowVersion = result.RowVersion;
                    await this.indexedDbService.updateOrder(orders[orderIndex].OrderClientId, orders[orderIndex]);
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
