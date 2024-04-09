import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment.development';
import { IBazaraLoginDTO } from '../../models/login-model/IBazaraLoginDTO';
import { IApiResult } from '../../models/IApiResult';
import { ILoginResult } from '../../models/login-model/ILoginResultDTO';
import { IndexedDbService } from '../indexed-db/generic-indexed-db.service';
import { UtilityService } from '../common/utility.service';

@Injectable({
  providedIn: 'root'
})
export class BazaraService {

  // snackBar!: MatSnackBar;

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService,
    private utilityService: UtilityService, private router: Router,
    private snackBar: MatSnackBar) { }

  bazaraLogin(model: IBazaraLoginDTO): Observable<ILoginResult> {
    const hashedPassword = CryptoJS.MD5(model.password.trim()).toString();
    const requestBody = {
      username: model.userName,
      password: hashedPassword
    };
    return this.http.post<ILoginResult>(environment.apiUrl + '/sync/login', requestBody);
  }
}

// Mr Mohamadi's code
// return this.http.post<ILoginResult>(environment.apiUrl + '/sync/login', requestBody)
// .pipe(
//   tap((response: any) => {          
//     if (response.Result) {
//       this.indexedDbService.insertingToDb('Login', [response.Data])
//         .then(() => {
//           this.indexedDbService.setVisitorId(response.Data.VisitorId);
//           localStorage.setItem('UserData', response.Data);
//           localStorage.setItem('UserToken', response.Data.UserToken);
//           this.utilityService.showMenuFooter.next(true);
//           this.router.navigate(['/dashboard']); // Navigate on successful login
//          return true;
//         })
//         .catch((error) => console.error('Error storing login response:', error));
//     }
//     else {
//       console.error('Login error:', response.Message);
//       this.snackBar.open(response.Message, 'بستن', {
//         duration: 5000,
//         verticalPosition: 'top'
//       });
//       return false;
//     }
//   }),
//   catchError((error: HttpErrorResponse) => {
//     console.error('Login error:', error);
//     let errorMessage = 'An unexpected error occurred!';
//     if (error.status === 0) {
//       errorMessage = 'اتصال اینترنت خود را بررسی بفرمایید، سپس دوباره تلاش کنید!';
//     }
//     this.snackBar.open(errorMessage, 'بستن', {
//       duration: 5000,
//       verticalPosition: 'top'
//     });
//     return of({ Result: false, Message: errorMessage, Data: {} });
//   })
// );