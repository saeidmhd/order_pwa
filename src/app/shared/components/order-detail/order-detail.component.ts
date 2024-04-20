import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { IndexedDbService } from '../../../core/services/indexed-db.service';
import { Order } from 'src/app/core/models/order';
import { Person } from 'src/app/core/models/Person';
import { OrderDetail } from 'src/app/core/models/order-detail';
import { Product } from 'src/app/core/models/product';
import { ProductDetail } from 'src/app/core/models/product-detail';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order | undefined;
  orderDetails: OrderDetail[] = [];
  products: Product[] = [];
  person: Person | undefined;
  productDetails: ProductDetail[] = [];
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private indexedDbService: IndexedDbService
  ) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      // Navigate to a 404 page or show an error message
      this.router.navigate(['/404']);
    } else {
      const orderId = +id;
      // this.order = (await this.indexedDbService.getOrders()).find(order => order.OrderId === orderId);
      // if (!this.order) {
      //   // Handle the case where the order is not found
      //   this.errorMessage = `Order with ID ${orderId} not found`;
      // } else {
      //   this.orderDetails = (await this.indexedDbService.getOrderDetails()).filter(detail => detail.OrderId === orderId);
      //   this.productDetails = (await Promise.all(this.orderDetails.map(async detail =>
      //     (await this.indexedDbService.getProductDetails()).find(productDetail => productDetail.ProductDetailId === detail.ProductDetailId)
      //   ))).filter((productDetail): productDetail is ProductDetail => productDetail !== undefined);

      //   this.products = (await Promise.all(this.productDetails.map(async productDetail =>
      //     (await this.indexedDbService.getProducts()).find(product => product.ProductId === productDetail.ProductId)
      //   ))).filter((product): product is Product => product !== undefined);

      //   this.person = (await this.indexedDbService.getPeople()).find(person => person.PersonId === this.order?.PersonId);
      // }
    }
  }

}
