// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product';
import { IndexedDbService } from '../../../core/services/indexed-db.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = false; // Add a new property to track loading state

  searchText = '';

  get filteredProducts() {
    return this.products.filter(product =>
      product.Name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  constructor(private indexedDbService: IndexedDbService, private productService: ProductService) { }

  ngOnInit(): void {
    this.isLoading = true; // Set loading state to true at the start
    this.indexedDbService.getProducts().then((products: Product[]) => {
      if (products.length > 0) {
        this.products = products;
        this.isLoading = false; // Set loading state to false when data is loaded
      } else {
        this.productService.getProducts().subscribe((response: { Result: any; Data: { Objects: { Products: Product[] ; }; }; }) => {
          if (response.Result) {
            this.products = response.Data.Objects.Products;
            this.indexedDbService.storeProducts(this.products).then(() => {
              console.log('Products data stored in IndexedDB');
              this.isLoading = false; // Set loading state to false when data is loaded
            });
          }
        });
      }
    });
  }
}