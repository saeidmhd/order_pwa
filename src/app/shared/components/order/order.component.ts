import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

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
  searchInput: string = '';
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  constructor(private orderReprtsService: OrderReportsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getData();
  }

  getData() {
    this.filteredData = this.orderReprtsService.getOrderReportsData();
    this.isLoading = false;
  }

  onSearch(e: Event) {
    fromEvent(this.inputSearch.nativeElement, "keyup")
      .pipe(
        debounceTime(300),
        map(event => event as KeyboardEvent),
        map(event => (event.target as HTMLInputElement).value),
        tap(i => +i != 0 ? this.performSearch(+i) : this.clearSearchWord())
      )
      .subscribe();
  }

  performSearch(searchValue: number) {
    if (searchValue != 0)
      this.filteredData = this.filteredData.filter(x => x.OrderId == searchValue);
    // else
    //   this.clearSearchWord();

  }

  clearSearchWord() {
    this.searchInput = '';
    this.getData();
  }
}