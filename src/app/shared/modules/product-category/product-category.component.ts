// product-category.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/core/models/product-category';
import { ProductCategoryService } from 'src/app/core/services/product-category.service';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  productCategories: ProductCategory[] = [];

  constructor(private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.productCategoryService.getProductCategories().subscribe(response => {
      if (response.Result) {
        this.productCategories = response.Data.Objects.ProductCategories;
      }
    });
  }
}
