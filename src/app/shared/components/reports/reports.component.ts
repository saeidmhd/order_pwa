import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  constructor(private router: Router) {}

  navigateToOrdersReport() {
    this.router.navigate(['/reports-orders']);
  }

  navigateToPeopleReport() {
    this.router.navigate(['/people-list']);
  }
}