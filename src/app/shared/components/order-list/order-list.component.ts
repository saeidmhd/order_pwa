// order-list.component.ts
import { Component, OnInit } from '@angular/core';

import { OrderDetail } from '../../../core/models/old/order-detail';
import { Person } from '../../../core/models/old/Person';
// import { IndexedDbService } from '../../../core/services/indexed-db.service';
import { Order } from 'src/app/core/models/old/order';
import * as moment from 'jalali-moment';
import { IndexedDbService } from 'src/app/core/services/indexed-db/indexed-db.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  orderDetails: OrderDetail[] = [];
  people: Person[] = [];
  isLoading = false;

  searchText = '';

  get filteredOrders() {
    return this.orders.filter(order =>
      this.getPersonName(order.PersonId).toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  constructor(private indexedDbService: IndexedDbService) { }

  ngOnInit(): void {
    this.isLoading = true;
    Promise.all([
      this.indexedDbService.getAllData<Order>("Order"),
      this.indexedDbService.getAllData<OrderDetail>("OrderDetail"),
      this.indexedDbService.getAllData<Person>("Person")
    ]).then(([orders, orderDetails, people]) => {
      console.log();
      
      this.orders = orders.sort((a, b) => new Date(b.OrderDate).getTime() - new Date(a.OrderDate).getTime());
      this.orderDetails = orderDetails;
      this.people = people;
      this.isLoading = false;
    }).catch(error => {
      console.error('Error getting data from IndexedDB:', error);
      // Handle the error appropriately (e.g., display a user-friendly message)
    });
}


  getOrderSum(order: Order): number {
    const relatedOrderDetails = this.orderDetails.filter(detail => detail.OrderId === order.OrderId);
    return relatedOrderDetails.reduce((sum, detail) => sum + (detail.Price), 0);
  }


  getPersonName(personId: number): string {
    const person = this.people.find(p => p.PersonId === personId);
    if (person) {
      const firstName = person.FirstName || ''; // Handle null or undefined FirstName
      const lastName = person.LastName || ''; // Handle null or undefined LastName
      return firstName + ' ' + lastName;
    }
    return ''; // Return empty string if person is null or undefined
  }

  getPerson(personId: number): Person | undefined {
    return this.people.find(p => p.PersonId === personId);
  }

  getFormattedDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  getFormattedPersianDate(dateString: string): string {
    let m = moment(dateString, 'YYYY-M-D HH:mm:ss');
    let persianDate = m.format('jYYYY/jM/jD HH:mm:ss');
    return persianDate;
  }


}
