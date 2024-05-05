import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Location } from '@angular/common';

import { UtilityService } from '../../../core/services/common/utility.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  msgNumber: number = 0;
  @Output() draweClicked = new EventEmitter<void>();

  @ViewChild('sidenav') sidenav: MatSidenav | undefined; // Add this line
  drawer: any;
  userTitle: string = '';

  constructor(private location: Location, public utilityService: UtilityService) {
    this.findUserTitle();
    this.detectMessageNumber();
  }

  findUserTitle() {
    this.utilityService.showHeaderFooter.subscribe(res => {
      if (res == 'login')
        this.userTitle = '';
      else
        this.userTitle = JSON.parse(localStorage.getItem('UserData')!)?.UserTitle!;
    });
  }

  detectMessageNumber() {
    this.utilityService.updateExist.subscribe(res => {
      this.msgNumber = ++this.msgNumber;
    });
  }

  openDrawer(): void {
    this.draweClicked.emit();
  }

  updatingSoftware() {
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }
}