import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product';
import { ProductCategory } from '../../../core/models/product-category';
import { IndexedDbService } from '../../../core/services/indexed-db.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  
  products: Product[] = [];
  productCategories: ProductCategory[] = [];
  selectedCategory: ProductCategory | null = null; // Add a new property to track the selected category
  isLoading = false;
  searchText = '';

  constructor(private indexedDbService: IndexedDbService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadProducts();
    this.loadProductCategories();
  }

  loadProducts(): void {
    this.indexedDbService.getProducts().then(products => {
      this.products = products;
      this.isLoading = false;
    });
  }

  loadProductCategories(): void {
    this.indexedDbService.getProductCategories().then(categories => {
      this.productCategories = categories;
    });
  }

  filterByCategory(category: ProductCategory): void {
    this.selectedCategory = category; // Set the selected category
  }

  clearSearch(): void {
    this.searchText = '';
  }

  get filteredProducts() {
    let filtered = this.products;
  
    // Filter by search text
    if (this.searchText) {
      filtered = filtered.filter(product =>
        product.Name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  
    // Filter by selected category
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.ProductCategoryId === this.selectedCategory?.ProductCategoryId);
    }
  
    return filtered;
  }
  
}
