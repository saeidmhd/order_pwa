import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProductCategory } from 'src/app/core/models/old/product-category';
import { IndexedDbService } from 'src/app/core/services/indexed-db/indexed-db.service';


@Component({
  selector: 'app-bottom-sheet-category',
  templateUrl: './bottom-sheet-category.component.html',
  styleUrls: ['./bottom-sheet-category.component.css']
})
export class BottomSheetCategoryComponent {

  categories: ProductCategory[] = [];
  selectedCategory: number | null = null; // Change to single selectedCategory instead of array
  productCategories: ProductCategory[] = [];
  showAllProducts: boolean = false;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetCategoryComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private indexedDbService: IndexedDbService,
  ) {
    this.selectedCategory = data.selectedCategory;
    this.loadProductCategories();
  }

  loadProductCategories(): void {
    this.indexedDbService.getAllData<ProductCategory>("ProductCategories").then(categories => {
      this.productCategories = categories;
    }).catch(error => {
      console.error('Error getting data from IndexedDB:', error);
      // Handle the error appropriately (e.g., display a user-friendly message)
    });
}

  toggleCategory(categoryId: number): void {
    if (this.selectedCategory === categoryId) {
      // If the clicked category is already selected, clear the selection
      this.selectedCategory = null;
    } else {
      // If a new category is clicked, set it as the selected category
      this.selectedCategory = categoryId;
    }
    this.applyFilters();
  }

  applyFilters(): void {
    this._bottomSheetRef.dismiss(this.selectedCategory);
  }

  clearFilters(): void {
    this.selectedCategory = null;
    this._bottomSheetRef.dismiss(this.selectedCategory);
  }

  toggleShowAllProducts(): void {
    this.showAllProducts = !this.showAllProducts;
    if (this.showAllProducts) {
      this.selectedCategory = null; // Clear selected category if showing all products
    }
    this.applyFilters();
  }

  isSelectedCategory(categoryId: number): boolean {
    return this.selectedCategory === categoryId;
  }
}