import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product';
import { ProductCategory } from '../../../core/models/product-category';
import { Picture } from '../../../core/models/picture'; // Import Picture model
import { PhotoGallery } from '../../../core/models/photo-gallery'; // Import PhotoGallery model
import { IndexedDbService } from '../../../core/services/indexed-db.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: number | null = null;
  productCategories: ProductCategory[] = [];
  pictures: Picture[] = []; // Add pictures array
  photoGalleries: PhotoGallery[] = []; // Add photoGalleries array
  //selectedCategory: ProductCategory | null = null;
  isLoading = false;
  searchText = '';

  constructor(
    private indexedDbService: IndexedDbService,
    private route: ActivatedRoute,
    private router: Router  // <-- Make sure to inject the Router service here
  ) {}
  

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.selectedCategory = +categoryId;
      }
    this.loadProducts();
    //this.loadProductCategories();
    this.loadPictures(); // Load pictures
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
              price:  parseFloat((productDetail as any)['Price' + productDetail?.DefaultSellPriceLevel]).toLocaleString('fa-IR', { style: 'decimal' }) + ' ریال ',
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

  loadPictures(): void { // Add loadPictures method
    this.indexedDbService.getPictures().then(pictures => {
      this.pictures = pictures;
    });
  }

  loadPhotoGalleries(): void { // Add loadPhotoGalleries method
    this.indexedDbService.getPhotoGalleries().then(photoGalleries => {
      this.photoGalleries = photoGalleries;
    });
  }


  clearSearch(): void {
    this.searchText = '';
  }

  getProductImageUrl(product: Product): string | undefined { // Add getProductImageUrl method
    const photoGallery = this.photoGalleries.find(pg => pg.ItemCode === product.ProductId);
    const picture = this.pictures.find(p => p.PictureId === photoGallery?.PictureId);
    return picture ? 'https://mahakacc.mahaksoft.com' + picture.Url : undefined;
}


  get filteredProducts() {
    let filtered = this.products;

    // Filter by search text
    if (this.searchText) {
      filtered = filtered.filter(product =>
        product.Name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    return filtered;
  }
}
