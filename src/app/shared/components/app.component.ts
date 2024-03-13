import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild("drawer") drawer!:MatDrawer;

  test():void {
    console.log("drawer opened");
    this.drawer.open();
  }

  constructor(private router: Router) { }

  navigateToBasicInfo() {
    this.router.navigate(['/basic-info']);
  }

  navigateToOperations() {
    // Navigate to the Operations page
  }

  navigateToReports() {
    this.router.navigate(['/order-list']);
  }

  navigateToUpdateInfo() {
    this.router.navigate(['/update-info']);
    }
sidenav: any;
  
}
