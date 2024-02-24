import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

import { IndexedDbService } from './indexed-db.service';
import { PhotoGallery, PhotoGalleryResponse } from '../models/photo-gallery'; // Import your PhotoGallery interface

@Injectable({
  providedIn: 'root'
})
export class PhotoGalleryService {
  private apiUrl = 'https://mahakacc.mahaksoft.com/api/v3/sync/getalldata'; // Replace with your API URL

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {}

  getPhotoGalleries(): Observable<PhotoGalleryResponse> {
    return from(this.indexedDbService.getMaxRowVersion('photoGalleryStore')).pipe(
      switchMap(fromPhotoGalleryVersion => {
        const token = this.indexedDbService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const body = { fromPhotoGalleryVersion };

        return this.http.post<PhotoGalleryResponse>(this.apiUrl, body, { headers }).pipe(
          tap((response) => {
            if (response.Result) {
              // Successful request
              this.indexedDbService.storePhotoGalleries(response.Data.Objects.PhotoGalleries)
                .then(() => console.log('Photo galleries data stored in IndexedDB'))
                .catch((error: any) => console.error('Error storing photo galleries data:', error));
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
