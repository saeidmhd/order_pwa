// order-list.component.ts
import { Component, OnInit } from '@angular/core';

import { OrderDetail } from '../../../core/models/order-detail';
import { Person } from '../../../core/models/Person';
import { IndexedDbService } from '../../../core/services/indexed-db.service';
import { Order } from 'src/app/core/models/order';


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
      this.indexedDbService.getOrders(),
      this.indexedDbService.getOrderDetails(),
      this.indexedDbService.getPeople()
    ]).then(([orders, orderDetails, people]) => {
      this.orders = orders;
      this.orderDetails = orderDetails;
      this.people = people;
      this.isLoading = false;
    });
  }

  getOrderSum(order: Order): number {
    const relatedOrderDetails = this.orderDetails.filter(detail => detail.OrderId === order.OrderId);
    return relatedOrderDetails.reduce((sum, detail) => sum + (detail.Count1 * detail.Price), 0);
  }

  getPersonName(personId: number): string {
    const person = this.people.find(p => p.PersonId === personId);
    return person ? person.FirstName + ' ' + person.LastName : '';
  }
  getPerson(personId: number): Person | undefined {
    return this.people.find(p => p.PersonId === personId);
}

}
