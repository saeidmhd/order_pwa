// product-detail.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';

import { IndexedDbService } from './indexed-db.service';
import { ProductDetailsResponse } from '../models/product-detail';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata';

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getProductDetails(): Observable<ProductDetailsResponse> {
    const token = this.indexedDbService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      fromProductDetailVersion: 0
    };

    return this.http.post<ProductDetailsResponse>(this.apiUrl, body, { headers }).pipe(
      tap((response) => {
        if (response.Result) {
          // Successful request
          this.indexedDbService.storeProductDetails(response.Data.Objects.ProductDetails)
            .then(() => console.log('Product details data stored in IndexedDB'))
            .catch((error: any) => console.error('Error storing product details data:', error));
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