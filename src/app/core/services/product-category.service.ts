import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

import { IndexedDbService } from './indexed-db.service';
import { ProductCategoriesResponse } from '../models/product-category'; // Import the ProductCategoriesResponse interface

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata'; // Replace with your API URL

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getProductCategories(): Observable<ProductCategoriesResponse> {
    return from(this.indexedDbService.getMaxRowVersion('productCategoryStore')).pipe( // Replace 'productCategoryStore' with the name of your IndexedDB store for product categories
      switchMap(fromProductCategoryVersion => {
        const token = this.indexedDbService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const body = { fromProductCategoryVersion };

        return this.http.post<ProductCategoriesResponse>(this.apiUrl, body, { headers }).pipe(
          tap((response) => {
            if (response.Result) {
              // Successful request
              console.log(response.Data.Objects.ProductCategories)
              this.indexedDbService.storeProductCategories(response.Data.Objects.ProductCategories) // Replace 'storeProductCategories' with your method for storing product categories in IndexedDB
                .then(() => console.log('Product categories data stored in IndexedDB'))
                .catch((error: any) => console.error('Error storing product categories data:', error));
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
