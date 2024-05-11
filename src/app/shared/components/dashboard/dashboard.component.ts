import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/core/services/common/utility.service';
import { CheckForUpdateService } from 'src/app/core/services/pwa_services/check-for-update.service';
import { LogUpdateService } from 'src/app/core/services/pwa_services/log-update.service';
import { PromptUpdateService } from 'src/app/core/services/pwa_services/prompt-update.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  manualHeight!: number;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.measureHeight();
  }

  measureHeight() {
    this.manualHeight = window.innerHeight - 128;
  }

  constructor(private checkForUpdate: CheckForUpdateService,
              private logUpdate: LogUpdateService, private promptUdate: PromptUpdateService,
              private utilityService: UtilityService) {
    this.measureHeight();
    this.utilityService.showHeaderFooter.next('dashboard');
  }

  // ************** transfer to other component
  // navigateToBasicInfo() {
  //   this.router.navigate(['/basic-info']);
  // }

  // navigateToOperations() {
  //   this.router.navigate(['/invoice']);
  // }

  // navigateToReports() {
  //   this.router.navigate(['/order-list']);
  // }

  // navigateToUpdateInfo() {
  //   this.router.navigate(['/update-info']);
  // }
}