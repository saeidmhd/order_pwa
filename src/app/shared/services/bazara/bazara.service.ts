import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import { environment } from 'src/environments/environment.development';
import { IBazaraLoginDTO } from '../../models/bazara-models/login-model/IBazaraLoginDTO';
import { IApiResult } from '../../models/bazara-models/get-all-data-DTOs/IApiResult';
import { ILoginResult } from '../../models/bazara-models/login-model/ILoginResultDTO';
import { IGetBazaraData } from '../../models/bazara-models/get-all-data-DTOs/IGetBazaraData';
import { ISaveBazaraData } from '../../models/bazara-models/save-all-data-DTOs/ISaveBazaraData';

@Injectable({
  providedIn: 'root'
})
export class BazaraService {

  headerOption = {
    'Authorization': 'df',
      'Accept': 'application/json',
      'Content-Type': 'application/json-patch+json'
  }
  

  constructor(private http: HttpClient) {
    this.headerOption = {
      'Authorization': localStorage.getItem('UserToken')!,
      'Accept': 'application/json',
      'Content-Type': 'application/json-patch+json'
    };
   }

  bazaraLogin(model: IBazaraLoginDTO): Observable<ILoginResult> {
    const hashedPassword = CryptoJS.MD5(model.password.trim()).toString();
    const requestBody = {
      username: model.userName,
      password: hashedPassword
    };
    return this.http.post<ILoginResult>(environment.apiUrl + '/sync/login', requestBody);
  }

  getBazaraData(model: IGetBazaraData): Observable<IApiResult> {    
    return this.http.post<IApiResult>(environment.apiUrl + '/sync/GetAllData', model, {
      headers: {'Authorization': localStorage.getItem('UserToken')!,
      'Accept': 'application/json',
      'Content-Type': 'application/json-patch+json'}
    });
  }

  saveBazaraData(model: ISaveBazaraData) {
    return this.http.post<any>(environment.apiUrl + '/sync/SaveAllData', model, {
      headers: {'Authorization': localStorage.getItem('UserToken')!,
      'Accept': 'application/json',
      'Content-Type': 'application/json-patch+json'}
    });
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