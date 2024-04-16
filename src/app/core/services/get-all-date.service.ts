import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, tap, catchError, map } from 'rxjs/operators';

import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllDataService<T> {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata';

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getData(storeName: string, responsePropertyName: string, storeMethod: (data: T[]) => Promise<void>): Observable<T[]> {
    return from(this.indexedDbService.getMaxRowVersion(storeName)).pipe(
      switchMap(fromVersion => this.makeRequest(fromVersion, responsePropertyName, storeMethod))
      
    );
  }
  private makeRequest(fromVersion: number, responsePropertyName: string, storeMethod: (data: T[]) => Promise<void>): Observable<T[]> {
    const token = this.indexedDbService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { fromVersion };

    return this.http.post<{ Result: boolean; Data: { Objects: { [key: string]: T[]; }; }; }>(this.apiUrl, body, { headers }).pipe(
      map(response => this.handleResponse(response, responsePropertyName, storeMethod)),
      catchError(this.handleError)
    );
  }

  private handleResponse(response: { Result: any; Data: { Objects: { [x: string]: any; }; }; }, responsePropertyName: string, storeMethod: (data: T[]) => Promise<void>): T[] {
    if (response.Result) {
      // Successful request
      storeMethod(response.Data.Objects[responsePropertyName])
        .then(() => console.log(`${responsePropertyName} data stored in IndexedDB`))
        .catch((error: any) => console.error(`Error storing ${responsePropertyName} data:`, error));
      return response.Data.Objects[responsePropertyName];
    } else {
      // Failed request
      console.error('Request error:', response);
      throw new Error('Request failed');
    }
  }

  private handleError(error: any): Observable<never> {
    console.error('Request error:', error);
    throw error;
  }
}
