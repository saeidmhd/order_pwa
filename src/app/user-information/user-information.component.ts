import { Component, OnInit } from '@angular/core';
import { IndexedDbService } from '../indexed-db.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  userData: any;

  constructor(private indexedDbService: IndexedDbService) { }

  ngOnInit(): void {
    this.indexedDbService.getLoginResponse().then((data: any) => {
      this.userData = data;
    });
  }
}
