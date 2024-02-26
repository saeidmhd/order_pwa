// people.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

import { IndexedDbService } from './indexed-db.service';
import { PeopleResponse } from '../models/Person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata';

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getPeople(): Observable<PeopleResponse> {
    return from(this.indexedDbService.getMaxRowVersion('personStore')).pipe(
      switchMap(FromPersonVersion => {
        const token = this.indexedDbService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const body = { FromPersonVersion };

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
      })
    );
  }
}
