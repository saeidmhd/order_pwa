// product-detail-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductDetail } from '../../../core/models/product-detail';
import { IndexedDbService } from '../../../core/services/indexed-db.service';
import { ProductDetailService } from '../../../core/services/product-detail.service';

@Component({
  selector: 'app-product-detail-list',
  templateUrl: './product-detail-list.component.html',
  styleUrls: ['./product-detail-list.component.css']
})
export class ProductDetailListComponent implements OnInit {
  productDetails: ProductDetail[] = [];
  isLoading = false; // Add a new property to track loading state

  searchText = '';

  get filteredProductDetails() {
    return this.productDetails.filter(productDetail =>
      productDetail.Barcode.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  constructor(private indexedDbService: IndexedDbService, private productDetailService: ProductDetailService) { }

  ngOnInit(): void {
    this.isLoading = true; // Set loading state to true at the start
    this.indexedDbService.getProductDetails().then((productDetails: ProductDetail[]) => {
      if (productDetails.length > 0) {
        this.productDetails = productDetails;
        this.isLoading = false; // Set loading state to false when data is loaded
      } else {
        this.productDetailService.getProductDetails().subscribe((response: { Result: any; Data: { Objects: { ProductDetails: ProductDetail[] ; }; }; }) => {
          if (response.Result) {
            this.productDetails = response.Data.Objects.ProductDetails;
            this.indexedDbService.storeProductDetails(this.productDetails).then(() => {
              console.log('Product details data stored in IndexedDB');
              this.isLoading = false; // Set loading state to false when data is loaded
            });
          }
        });
      }
    });
  }
}