import { Component, OnInit } from '@angular/core';
import { BanksService } from '../../../core/services/banks.service';
import { PeopleService } from '../../../core/services/people.service';
import { ProductService } from '../../../core/services/product.service';
import { ProductDetailService } from '../../../core/services/product-detail.service';
import { VisitorPeopleService } from 'src/app/core/services/visitor-person.service';
import { OrdersService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
  isLoading = false;
  banksReceived = false;
  peopleReceived = false;
  productsReceived = false;
  productDetailsReceived = false;
  visitorPeopleReceived = false;
  ordersReceived = false;

  constructor(
    private banksService: BanksService,
    private peopleService: PeopleService,
    private productService: ProductService,
    private productDetailService: ProductDetailService,
    private visitorPeopleService: VisitorPeopleService,
    private ordersService: OrdersService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    try {
      const banks = await this.banksService.getBanks().toPromise();
      this.banksReceived = true;
      // Store banks in IndexedDB

      const people = await this.peopleService.getPeople().toPromise();
      this.peopleReceived = true;
      // Store people in IndexedDB

      const products = await this.productService.getProducts().toPromise();
      this.productsReceived = true;
      // Store products in IndexedDB

      const productDetails = await this.productDetailService.getProductDetails().toPromise();
      this.productDetailsReceived = true;

      const visitorPeople = await this.visitorPeopleService.getVisitorPeople().toPromise();
      this.visitorPeopleReceived = true;

      const orders = await this.ordersService.getOrders().toPromise();
      this.ordersReceived = true;

      // Store product details in IndexedDB
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
