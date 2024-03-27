import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../models/Person';


@Injectable({
  providedIn: 'root'
})
export class PersonSelectionService {
  private selectedPersonSubject = new BehaviorSubject<Person | null>(null);
  selectedPerson$ = this.selectedPersonSubject.asObservable();

  selectPerson(person: Person): void {
    this.selectedPersonSubject.next(person);
  }
}
