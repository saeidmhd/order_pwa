import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  @Output() draweClicked = new EventEmitter<void>();

  @ViewChild('sidenav') sidenav: MatSidenav | undefined; // Add this line
drawer: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openDrawer():void {
    this.draweClicked.emit();
  }

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

}
