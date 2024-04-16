import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ObservableInput, from } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { GenericIndexedDbService } from '../../services/indexed-db/generic-indexed-db.service';
import { IBazaraProduct } from '../../models/bazara-models/bazara-DTOs/IBazaraProduct';
import { IBazaraProductDetail } from '../../models/bazara-models/bazara-DTOs/IBazaraProductDetail';
import { IBazaraVisitorProduct } from '../../models/bazara-models/bazara-DTOs/IBazaraVisitorProduct';

@Component({
  selector: 'app-product',
  standalone: false,
  // imports: [CommonModule, ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  private productsSubject$: BehaviorSubject<IBazaraProduct[]> = new BehaviorSubject<IBazaraProduct[]>([]);
  get products$(): Observable<IBazaraProduct[]> {
    return this.productsSubject$.asObservable();
  }

  private productDetailsSubject: BehaviorSubject<IBazaraProductDetail[]> = new BehaviorSubject<IBazaraProductDetail[]>([]);
  get productDetails$(): Observable<IBazaraProductDetail[]> {
    return this.productDetailsSubject.asObservable();
  }

  private visitorProductSubject: BehaviorSubject<IBazaraVisitorProduct[]> = new BehaviorSubject<IBazaraVisitorProduct[]>([]);
  get visitorProducts$(): Observable<IBazaraVisitorProduct[]> {
    return this.visitorProductSubject.asObservable();
  }

  constructor(private genericIndexedService: GenericIndexedDbService) { }

  ngOnInit(): void {
    this.getData().then(() => {
      this.setProductName();
      this.setProductCount();
    });
  }

  async getData(): Promise<void> {
    await this.getProducts();
    await this.getProductDetail();
    await this.getVisitorProduct();
    return new Promise((resolve) => {
      resolve();
    });
  }

  async getProducts() {
    this.genericIndexedService.getAllData<IBazaraProduct>('Product').then((products) => {
      // console.log(products);
      this.productsSubject$.next(products)
    });
  }

  async getProductDetail() {
    this.genericIndexedService.getAllData<IBazaraProductDetail>('ProductDetail').then(productDetails => {
      // console.log(productDetails, 'Product details');
      this.productDetailsSubject.next(productDetails);
    })
  }

  async getVisitorProduct() {
    this.genericIndexedService.getAllData<IBazaraVisitorProduct>('VisitorProduct').then(visitorProducts => {
      // console.log(visitorProducts, 'Product details');
      this.visitorProductSubject.next(visitorProducts);
    })
  }

  setProductName() {
    this.productDetails$.pipe(
      switchMap(pds => from(pds)),
      mergeMap((pd) =>
        this.products$.pipe(map((p) => {
          pd.ProductName = p.find(x => x.ProductId === pd.ProductId)?.Name!;
        })),        
      ),
    ).subscribe();
  }

  setProductCount() {
    this.productDetails$.pipe(
      switchMap(pds => from(pds)),
      mergeMap((pd) =>
        this.visitorProducts$.pipe(map((vp) => {
          pd.Count1 = vp.find(x => x.ProductDetailId === pd.ProductDetailId && !x.Deleted)?.Count1!;
          pd.Count2 = vp.find(x => x.ProductDetailId === pd.ProductDetailId && !x.Deleted)?.Count2!;
        }))
      )
    ).subscribe();
  }
}