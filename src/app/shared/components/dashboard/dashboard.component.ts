import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/core/services/common/utility.service';
import { CheckForUpdateService } from 'src/app/core/services/pwa_services/check-for-update.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  manualHeight!: number;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.measureHeight();
  }
  
  measureHeight() {
    this.manualHeight = window.innerHeight - 128;
  }

  constructor(private router: Router, private checkForUpdate: CheckForUpdateService, private utilityService: UtilityService) {
    this.manualHeight = window.innerHeight - 128;
    this.utilityService.showHeaderFooter.next('dashboard');
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
