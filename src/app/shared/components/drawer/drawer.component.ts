import { ViewChild , Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UtilityService } from '../../services/utility.service';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
  @ViewChild("drawer") drawer!: MatDrawer;

  test(): void {
    this.drawer.open();
  }

  constructor(private router: Router, public utilityService: UtilityService) {
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
    this.router.navigate(['/login']);
    
  }
}
