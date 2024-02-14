import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
  }
navigateToIncentivePlans() {
throw new Error('Method not implemented.');
}
navigateToIncomes() {
throw new Error('Method not implemented.');
}
navigateToBanks() {
  this.router.navigate(['/bank-list']);
}
navigateToGoods() {
throw new Error('Method not implemented.');
}
navigateToPeople() {
  this.router.navigate(['/people-list']);
}


 
}
