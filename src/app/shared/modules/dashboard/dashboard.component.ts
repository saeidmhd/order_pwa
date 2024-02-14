import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToBasicInfo() {
    this.router.navigate(['/basic-info']);
  }

  navigateToOperations() {
    // Navigate to the Operations page
  }

  navigateToReports() {
    // Navigate to the Reports page
  }

  navigateToUpdateInfo() {
    this.router.navigate(['/update-info']);
    }
}
