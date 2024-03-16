import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  @Output() draweClicked = new EventEmitter<void>();

  @ViewChild('sidenav') sidenav: MatSidenav | undefined; // Add this line
drawer: any;

  constructor() { }

  ngOnInit(): void {
  }
  openDrawer():void {
    this.draweClicked.emit();
  }

}
