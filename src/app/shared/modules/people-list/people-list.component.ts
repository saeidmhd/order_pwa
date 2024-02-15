// people-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Person } from '../../../core/models/Person';
import { IndexedDbService } from '../../../core/services/indexed-db.service';
import { PeopleService } from '../../../core/services/people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  isLoading = false; // Add a new property to track loading state

  constructor(private indexedDbService: IndexedDbService, private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.isLoading = true; // Set loading state to true at the start
    this.indexedDbService.getPeople().then((people: Person[]) => {
      if (people.length > 0) {
        this.people = people;
        this.isLoading = false; // Set loading state to false when data is loaded
      } else {
        this.peopleService.getPeople().subscribe((response: { Result: any; Data: { Objects: { People: Person[] ; }; }; }) => {
          if (response.Result) {
            this.people = response.Data.Objects.People;
            this.indexedDbService.storePeople(this.people).then(() => {
              console.log('People data stored in IndexedDB');
              this.isLoading = false; // Set loading state to false when data is loaded
            });
          }
        });
      }
    });
  }
}
