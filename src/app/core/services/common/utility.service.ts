import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  showHeaderFooter: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

}