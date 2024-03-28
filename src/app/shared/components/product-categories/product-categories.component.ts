import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from '../../../core/models/product-category';
import { IndexedDbService } from '../../../core/services/indexed-db.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {
  productCategories: ProductCategory[] = [];

  constructor(
    private indexedDbService: IndexedDbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProductCategories();
  }

  loadProductCategories(): void {
    this.indexedDbService.getProductCategories().then(categories => {
      this.productCategories = categories;
    });
  }

  selectCategory(category: ProductCategory): void {
    this.router.navigate(['/product-list', category.ProductCategoryId]);
  }
}
