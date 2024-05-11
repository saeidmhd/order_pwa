import { ViewChild, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

import { UtilityService } from '../../../core/services/common/utility.service';
import { AuthService } from '../../../core/services/authorizing/auth.service';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
  manualHeight!: number;
  @ViewChild("drawer") drawer!: MatDrawer;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.measureHeight();
  }
  
  constructor(private router: Router, public utilityService: UtilityService, private authService: AuthService) {
    this.measureHeight();
  }

  measureHeight() {
    this.utilityService.showHeaderFooter.subscribe(res => {
      if (res == 'login') {
        this.manualHeight = window.innerHeight;
      }
      else {
        this.manualHeight = window.innerHeight - 64;
      }
    });
  }

  test(): void {
    this.drawer.open();
  }

  navigateToBasicInfo() {
    this.drawer.close();
    this.router.navigate(['/basic-info']);
  }

  navigateToOperations() {
    this.drawer.close();
    this.router.navigate(['/invoice']);
  }

  navigateToReports() {
    this.drawer.close();
    this.router.navigate(['/order-list']);
  }

  navigateToUpdateInfo() {
    this.drawer.close();
    this.router.navigate(['/update-info']);
  }

  navigateToDashboard() {
    this.drawer.close();
    this.router.navigate(['/dashboard']);
  }

  navigateTologin() {
    this.drawer.close();
    this.authService.logoutFromMobileOrdering()
  }
}