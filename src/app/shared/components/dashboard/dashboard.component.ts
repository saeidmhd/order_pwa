import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckForUpdateService } from 'src/app/core/services/pwa_services/check-for-update.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private router: Router , private checkForUpdate : CheckForUpdateService ) {
   }

  ngOnInit(): void {
    
  }

  navigateToBasicInfo() {
    this.router.navigate(['/basic-info']);
  }

  navigateToOperations() {
    this.router.navigate(['/invoice']);
  }

  navigateToReports() {
    this.router.navigate(['/order-list']);
  }

  navigateToUpdateInfo() {
    this.router.navigate(['/update-info']);
    }
}
