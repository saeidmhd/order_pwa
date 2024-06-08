import { Component, OnInit } from '@angular/core';
import { Mission } from 'src/app/core/models/bazara/bazara-DTOs/mission';
import { IndexedDbService } from 'src/app/core/services/indexed-db/indexed-db.service';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.css']
})
export class MissionCardComponent implements OnInit {
  missions: Mission[] = [];
  isLoading = false;

  constructor(private indexedDbService: IndexedDbService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.indexedDbService.getAllData<Mission>("Mission").then((missions: Mission[]) => {
      if (missions.length > 0) {
        this.missions = missions;
        this.isLoading = false;
      }
    });
  }
}
