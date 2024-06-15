import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { Person } from 'src/app/core/models/bazara/bazara-DTOs/Person';
import { Order } from 'src/app/core/models/bazara/bazara-DTOs/order';
import { OrderDetail } from 'src/app/core/models/bazara/bazara-DTOs/order-detail';
import { IndexedDbService } from 'src/app/core/services/indexed-db/indexed-db.service';
import { STORE_NAMES } from 'src/app/core/constants/store-names';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  isLoading = false;

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  get order$(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

  private orderDetailsSubject = new BehaviorSubject<OrderDetail[]>([]);
  get orderDetails$(): Observable<OrderDetail[]> {
    return this.orderDetailsSubject.asObservable();
  }

  private peopleSubject = new BehaviorSubject<Person[]>([]);
  get people$(): Observable<Person[]> {
    return this.peopleSubject.asObservable();
  }

  constructor(private indexedDbService: IndexedDbService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchData();
  }

  async fetchData() {
    await this.fetchPeople();
    await this.fetchOrders();
    await this.fetchOrderDetails();

    await this.setData();
  }

  async fetchPeople() {
    this.indexedDbService.getAllData<Person>(STORE_NAMES[0]).then(people => {
      this.peopleSubject.next(people);
    });
  }

  async fetchOrders() {
    this.indexedDbService.getAllData<Order>(STORE_NAMES[0]).then(orders => {
      this.ordersSubject.next(orders);
    });
  }

  async fetchOrderDetails() { }

  async setData() {
    // console.log(this,this.people$, 'people pore');

    forkJoin([this.people$, this.order$, this.orderDetails$])
      .subscribe(res =>
        console.log(res, 'hvfsgha')

      );
  }
}
