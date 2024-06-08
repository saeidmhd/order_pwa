import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { IndexedDbService } from '../../../core/services/indexed-db.service';
import { Order } from 'src/app/core/models/bazara/bazara-DTOs/order';
import { Person } from 'src/app/core/models/bazara/bazara-DTOs/person';
import { OrderDetail } from 'src/app/core/models/bazara/bazara-DTOs/order-detail';
import { Product } from 'src/app/core/models/old/product';
import { ProductDetail } from 'src/app/core/models/bazara/bazara-DTOs/productDetail';
import { IndexedDbService } from 'src/app/core/services/indexed-db/indexed-db.service';

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
    private indexedDbService: IndexedDbService
  ) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      // Navigate to a 404 page or show an error message
      this.router.navigate(['/404']);
    } else {
      const orderId = +id;
      this.order = (await this.indexedDbService.getAllData<Order>("Order")).find(order => order.OrderId === orderId);
      if (!this.order) {
        // Handle the case where the order is not found
        this.errorMessage = `Order with ID ${orderId} not found`;
      } else {
        this.orderDetails = (await this.indexedDbService.getAllData<OrderDetail>("OrderDetail")).filter(detail => detail.OrderId === orderId);
        this.productDetails = (await Promise.all(this.orderDetails.map(async detail =>
          (await this.indexedDbService.getAllData<ProductDetail>("ProductDetail")).find(productDetail => productDetail.ProductDetailId === detail.ProductDetailId)
        ))).filter((productDetail): productDetail is ProductDetail => productDetail !== undefined);

        this.products = (await Promise.all(this.productDetails.map(async productDetail =>
          (await this.indexedDbService.getAllData<Product>("Product")).find(product => product.ProductId === productDetail.ProductId)
        ))).filter((product): product is Product => product !== undefined);

        this.person = (await this.indexedDbService.getAllData<Person>("Person")).find(person => person.PersonId === this.order?.PersonId);
      }
    }
}


}
