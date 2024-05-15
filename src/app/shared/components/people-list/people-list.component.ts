// people-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Person } from '../../../core/models/old/Person';
// import { IndexedDbService } from '../../../core/services/indexed-db.service';
// import { PeopleService } from '../../../core/services/people.service';
// import { PersonSelectionService } from 'src/app/core/services/person-selection.service';
import { Route, Router } from '@angular/router';
import { IndexedDbService } from 'src/app/core/services/indexed-db/indexed-db.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  constructor(private indexedDbService: IndexedDbService , private router : Router) { }

  selectPerson(person: Person): void {
    this.router.navigate(['/invoice']);
  }
  people: Person[] = [];
  isLoading = false; // Add a new property to track loading state

  searchText = '';

  get filteredPeople() {
    return this.people.filter(person =>
      (person.FirstName + ' ' + person.LastName).toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


  ngOnInit(): void {
    this.isLoading = true; // Set loading state to true at the start
    this.indexedDbService.getAllData<Person>("Person").then((people: Person[]) => {
      this.isLoading = false;
      if (people.length > 0) {
        this.people = people;
      }
    }).catch(error => {
      console.error('Error getting data from IndexedDB:', error);
      // Handle the error appropriately (e.g., display a user-friendly message)
    });
}

}
