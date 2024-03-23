import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild("drawer") drawer!: MatDrawer;

  test(): void {
    console.log("drawer opened");
    this.drawer.open();
  }

  constructor(private router: Router) {
  }

  navigateToBasicInfo() {
    this.router.navigate(['/basic-info']);
    this.drawer.close();
  }

  navigateToOperations() {
    this.router.navigate(['/invoice']);
    this.drawer.close();
  }

  navigateToReports() {
    this.router.navigate(['/order-list']);
    this.drawer.close();
  }

  navigateToUpdateInfo() {
    this.router.navigate(['/update-info']);
    this.drawer.close();
  }
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
    this.drawer.close();
  }

  navigateTologin() {
    this.router.navigate(['/login']);
    this.drawer.close();
  }
  sidenav: any;

}
