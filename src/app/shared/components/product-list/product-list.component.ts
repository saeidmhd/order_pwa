import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../core/models/product';
import { ProductCategory } from '../../../core/models/product-category';
import { Picture } from '../../../core/models/picture';
import { PhotoGallery } from '../../../core/models/photo-gallery';
import { IndexedDbService } from '../../../core/services/indexed-db.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetCategoryComponent } from '../bottom-sheet-category/bottom-sheet-category.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild('productListContainer') productListContainer!: ElementRef;

  selectedProducts: Product[] = [];

  constructor(
    private indexedDbService: IndexedDbService,
    private route: ActivatedRoute,
    private router: Router,
    private _bottomSheet: MatBottomSheet // <-- Make sure to inject the Router service here,
  ) { }

  increaseQuantity(product: Product): void {
    if (typeof product.quantity === 'number' && !isNaN(product.quantity)) {
      product.quantity++; // Increment the quantity
    } else {
      // If quantity is not a valid number, set it to 1
      product.quantity = 1;
    }
  }
  decreaseQuantity(product: Product): void {
    if (typeof product.quantity === 'number' && !isNaN(product.quantity) && product.quantity > 0) {
      product.quantity--; // Decrement the quantity if it's greater than 0
    } else {
      // If quantity is not a valid number or already 0, set it to 0
      product.quantity = 0;
    }
  }
  products: Product[] = [];
  selectedCategory: number | null = null;
  productCategories: ProductCategory[] = [];
  pictures: Picture[] = [];
  photoGalleries: PhotoGallery[] = [];
  isLoading = false;
  searchText = '';

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.selectedCategory = +categoryId;
      }
      this.loadProducts();
      this.loadProductCategories();
      this.loadPictures();
      this.loadPhotoGalleries();
    });
  }

  loadProducts(): void {
    this.indexedDbService.getProducts().then(products => {
      this.indexedDbService.getProductDetails().then(productDetails => {
        this.indexedDbService.getVisitorProducts().then(visitorProducts => {
          this.products = products.map(product => {
            const productDetail = productDetails.find(detail => detail.ProductId === product.ProductId);
            const visitorProduct = visitorProducts.find(vp => vp.ProductDetailId === productDetail?.ProductDetailId && vp.Deleted == false);
            return {
              ...product,
              price: parseFloat((productDetail as any)['Price' + productDetail?.DefaultSellPriceLevel]).toLocaleString('fa-IR', { style: 'decimal' }) + ' ریال ',
              count1: visitorProduct?.Count1,
              count2: visitorProduct?.Count2
            };
          }).filter(product =>
            product.count1 !== undefined &&
            product.count2 !== undefined &&
            (!this.selectedCategory || product.ProductCategoryId === this.selectedCategory)
          );
          this.isLoading = false;
        });
      });
    });
  }

  goToProductCategories(): void {
    this.router.navigate(['/product-categories']);
  }

  loadProductCategories(): void {
    this.indexedDbService.getProductCategories().then(categories => {
      this.productCategories = categories;
    });
  }

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(BottomSheetCategoryComponent, {
      data: {
        selectedCategory: this.selectedCategory // Pass the currently selected category
      }
    });
  
    bottomSheetRef.afterDismissed().subscribe(selectedCategory => {
      if (selectedCategory !== null && selectedCategory !== undefined) {
        // Only update the selected category if a valid category is returned
        this.selectedCategory = selectedCategory;
        this.scrollToTop();
      }
    });
  }
  

  loadPictures(): void {
    this.indexedDbService.getPictures().then(pictures => {
      this.pictures = pictures;
    });
  }

  loadPhotoGalleries(): void {
    this.indexedDbService.getPhotoGalleries().then(photoGalleries => {
      this.photoGalleries = photoGalleries;
    });
  }


  scrollToTop(): void {
    if (this.productListContainer && this.productListContainer.nativeElement) {
      this.productListContainer.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  
  clearSearch(): void {
    this.searchText = '';
  }

  getProductImageUrl(product: Product): string {
    const photoGallery = this.photoGalleries.find(pg => pg.ItemCode === product.ProductId);
    const picture = this.pictures.find(p => p.PictureId === photoGallery?.PictureId);
    if (picture) {
      return 'https://mahakacc.mahaksoft.com' + picture.Url;
    } else {
      return 'assets/img_empty_product.png';
    }
  }



  get filteredProducts() {
    let filtered = this.products;
  
    // Filter by selected category if it's not null
    if (this.selectedCategory !== null) {
      filtered = filtered.filter(product =>
        product.ProductCategoryId === this.selectedCategory
      );
    }
  
    // Filter by search text
    if (this.searchText) {
      filtered = filtered.filter(product =>
        product.Name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  
    return filtered;
  }
  
  
}
