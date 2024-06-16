import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { Person } from 'src/app/core/models/bazara/bazara-DTOs/Person';
import { Order } from 'src/app/core/models/bazara/bazara-DTOs/order';
import { OrderDetail } from 'src/app/core/models/bazara/bazara-DTOs/order-detail';
import { IndexedDbService } from 'src/app/core/services/indexed-db/indexed-db.service';
import { StoreName } from 'src/app/core/models/indexed-db/storeName';
import { OrdersReports } from 'src/app/core/models/pages/ordersReports';
import { OrderReportsService } from 'src/app/core/services/pages-services/order-reports.service';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  isLoading = false;
  filteredData: OrdersReports[] = [];

  constructor(private indexedDbService: IndexedDbService, 
              private orderReprtsService: OrderReportsService) {}
  
  ngOnInit(): void {
    this.isLoading = true;
    this.getData();    
  }

  getData() {
    this.filteredData = this.orderReprtsService.getOrderReportsData();
    this.isLoading = false;  
  }
}