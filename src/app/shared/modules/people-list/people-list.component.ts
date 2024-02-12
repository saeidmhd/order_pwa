import { Component, OnInit } from '@angular/core';
import { Person } from '../../../core/models/Person';
import { IndexedDbService } from '../../../core/services/indexed-db.service';
import { PeopleService } from '../../../core/services/people.service'; // Import PeopleService

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  people: Person[] | undefined;

  constructor(private indexedDbService: IndexedDbService, private peopleService: PeopleService) { } // Inject PeopleService

  ngOnInit(): void {
    this.indexedDbService.getLoginToken().then((token: string) => {
      this.peopleService.getPeople(token).subscribe((response: { Result: any; Data: { Objects: { People: Person[] | undefined; }; }; }) => {
        if (response.Result) {
          this.people = response.Data.Objects.People;
        }
      });
    });
  }
}
