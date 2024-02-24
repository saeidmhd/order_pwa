import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

import { IndexedDbService } from './indexed-db.service';
import { Picture, PictureResponse } from '../models/picture'; // Import your Picture interface

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata'; // Replace with your API URL

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getPictures(): Observable<PictureResponse> {
    return from(this.indexedDbService.getMaxRowVersion('pictureStore')).pipe(
      switchMap(fromPictureVersion => {
        const token = this.indexedDbService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const body = { fromPictureVersion };

        return this.http.post<PictureResponse>(this.apiUrl, body, { headers }).pipe(
          tap((response) => {
            if (response.Result) {
              // Successful request
              this.indexedDbService.storePictures(response.Data.Objects.Pictures)
                .then(() => console.log('Pictures data stored in IndexedDB'))
                .catch((error: any) => console.error('Error storing pictures data:', error));
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
