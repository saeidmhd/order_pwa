import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from 'src/app/core/models/bazara/bazara-DTOs/Person';
import { Order } from 'src/app/core/models/bazara/bazara-DTOs/order';
import { OrderDetail } from 'src/app/core/models/bazara/bazara-DTOs/order-detail';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
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
}
