import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BazaraService } from '../bazara/bazara.service';
import { IBazaraLoginDTO } from '../../models/login-model/IBazaraLoginDTO';
import { IndexedDbService } from '../indexed-db/generic-indexed-db.service';
import { ILoginResult } from '../../models/login-model/ILoginResultDTO';
import { UtilityService } from '../common/utility.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();

  constructor(private router: Router,
    private utilityService: UtilityService,
    private bazaraService: BazaraService,
    private indexedDbService: IndexedDbService,
    private snackBar: MatSnackBar) { }

  loginToMobileOrdering(model: IBazaraLoginDTO): Observable<boolean> {    
    this.bazaraService.bazaraLogin(model).subscribe({
      next: (res: ILoginResult) => {
        if (res.Result) {
          //insert into indexeddb

          this.indexedDbService.setVisitorId(res.Data!.VisitorId);
          localStorage.setItem('UserData', JSON.stringify(res.Data));
          localStorage.setItem('UserToken', res.Data!.UserToken);

          this.utilityService.showMenuFooter.next(true);

          this.isLoggedIn.next(true);

          this.router.navigate(['/dashboard']); // Navigate on successful login
          return true;
        }
        else {
          this.isLoggedIn.next(false);

          this.snackBar.open(res.Message, 'بستن', {
            duration: 5000,
            verticalPosition: 'top'
          });

          return false;
        }
      },
      error: (err) => {
        console.log(err);

      }
    });
    return this.isLoggedIn$;
  }

  public logoutFromMobileOrdering(): Observable<boolean> {
    localStorage.clear();
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
    return this.isLoggedIn$;
  }

  public isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.isLoggedIn$.subscribe(res => {
        console.log(res, '*******isLoggedIn chie');
        
        resolve(res)
      });
      reject("get errors");
    });
  }

  hasToken() {
  // let obj = localStorage.getItem('UserData');
  //   console.log(obj);
  //   let obj2 = JSON.parse(obj!);
  //   console.log(obj2.UserToken);
    
    return !!localStorage.getItem('UserToken');
  }
}