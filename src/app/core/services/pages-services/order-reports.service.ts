import { Injectable } from '@angular/core';
import { IndexedDbService } from '../indexed-db/indexed-db.service';
import { OrdersReports } from '../../models/pages/ordersReports';
import { Order } from '../../models/bazara/bazara-DTOs/order';
import { OrderDetail } from '../../models/bazara/bazara-DTOs/order-detail';
import { Person } from '../../models/bazara/bazara-DTOs/Person';
import { StoreName } from '../../models/indexed-db/storeName';

@Injectable({
  providedIn: 'root'
})
export class OrderReportsService {

  filteredData: OrdersReports[] = [];

  constructor(private indexedDbService: IndexedDbService) { }

  getOrderReportsData(): OrdersReports[] {
    let data: OrdersReports = {};
    this.filteredData = [];

    Promise.all([
      this.indexedDbService.getAllData<Order>(StoreName.Order),
      this.indexedDbService.getAllData<OrderDetail>(StoreName.OrderDetail),
      this.indexedDbService.getAllData<Person>(StoreName.Person)
    ]).then(([orders, orderDetails, people]) => {
      orders.forEach(order => {
        data = {};
        data.OrderId = order.OrderId;
        data.OrderClientId = order.OrderClientId;
        data.OrderDate = this.getFormattedDate(order.OrderDate);

        let relatedPerson = people.find(x => x.PersonId == order.PersonId);
        data.PersonName = relatedPerson?.FirstName! + relatedPerson?.LastName!;

        const relatedOrderDetails = orderDetails.filter(detail => detail.OrderId === order.OrderId)
        data.OrderSum = relatedOrderDetails.reduce((sum, detail) => sum + (detail.Price), 0);

        this.filteredData.unshift(data);
      });
    }).catch(error => {
      console.error('Error getting data from IndexedDB:', error);
    });

    return this.filteredData;
  }

  getFormattedDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR', options);
  }
}