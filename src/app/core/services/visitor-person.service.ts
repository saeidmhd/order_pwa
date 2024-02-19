// visitor-people.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { IndexedDbService } from './indexed-db.service';
import { VisitorPerson, VisitorPersonResponse } from '../models/visitor-person';
; // Import your VisitorResponse interface

@Injectable({
  providedIn: 'root'
})
export class VisitorPeopleService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata';

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getVisitorPeople(): Observable<VisitorPerson[]> {
    return from(this.indexedDbService.getMaxRowVersion('visitorPeopleStore')).pipe(
      switchMap(fromVisitorPersonVersion => {
        const token = this.indexedDbService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const body = { fromVisitorPersonVersion };

        return this.http.post<VisitorPersonResponse>(this.apiUrl, body, { headers }).pipe(
          map(response => response.Data.Objects.VisitorPeople), // Map the response to the VisitorPeople array
          tap((visitorPeople) => {
            if (visitorPeople) {
              // Successful request
              this.indexedDbService.storeVisitorPeople(visitorPeople)
                .then(() => console.log('Visitor people data stored in IndexedDB'))
                .catch((error: any) => console.error('Error storing visitor people data:', error));
            } else {
              // Failed request
              console.error('Request error:', visitorPeople);
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
