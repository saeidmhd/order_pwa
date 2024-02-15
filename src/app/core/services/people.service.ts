import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';

import { IndexedDbService } from './indexed-db.service';
import { PeopleResponse } from '../models/Person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata';

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getPeople(): Observable<PeopleResponse> {
    const token = this.indexedDbService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      FromPersonVersion: 0
    };

    return this.http.post<PeopleResponse>(this.apiUrl, body, { headers }).pipe(
      tap((response) => {
        if (response.Result) {
          // Successful request
          this.indexedDbService.storePeople(response.Data.Objects.People)
            .then(() => console.log('People data stored in IndexedDB'))
            .catch((error: any) => console.error('Error storing people data:', error));
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

