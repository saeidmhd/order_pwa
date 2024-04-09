import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product';
import { ProductCategory } from '../../../core/models/product-category';
import { Picture } from '../../../core/models/picture';
import { PhotoGallery } from '../../../core/models/photo-gallery';
import { IndexedDbService } from '../../../core/services/indexed-db.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  isSelectedCategory(categoryId: number): boolean {
    return this.selectedCategories.includes(categoryId);
  }

  
increaseQuantity(_t46: Product) {
throw new Error('Method not implemented.');
}
decreaseQuantity(_t46: Product) {
throw new Error('Method not implemented.');
}
goToProductCategories() {
throw new Error('Method not implemented.');
}
  selectedProducts: Product[] = [];
  products: Product[] = [];
  selectedCategory: number | null = null;
  productCategories: ProductCategory[] = [];
  selectedCategories: number[] = [];
  pictures: Picture[] = [];
  photoGalleries: PhotoGallery[] = [];
  isLoading = false;
  searchText = '';

  constructor(
    private indexedDbService: IndexedDbService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

  loadProductCategories(): void {
    this.indexedDbService.getProductCategories().then(categories => {
      this.productCategories = categories;
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

  toggleCategory(categoryId: number): void {
    const index = this.selectedCategories.indexOf(categoryId);
    if (index === -1) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }

  showAllProducts = true;

toggleShowAllProducts(): void {
  this.showAllProducts = !this.showAllProducts;
  if (this.showAllProducts) {
    this.selectedCategories = []; // Clear selected categories if showing all products
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

    // Filter by selected categories
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        this.selectedCategories.includes(product.ProductCategoryId)
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
