import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  showMenuFooter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

}