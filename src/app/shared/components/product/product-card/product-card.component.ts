import { Component, Input, OnInit } from '@angular/core';
import { IBazaraProduct } from 'src/app/shared/models/bazara-models/bazara-DTOs/IBazaraProduct';
import { IBazaraProductDetail } from 'src/app/shared/models/bazara-models/bazara-DTOs/IBazaraProductDetail';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
 
  @Input() product!: IBazaraProduct;
  isLoading = false;

  getProductImageUrl(): string {

    // const photoGallery = this.photoGalleries.find(pg => pg.ItemCode === product.ProductId);
    // const picture = this.pictures.find(p => p.PictureId === photoGallery?.PictureId);
    // if (picture) {
    //   return 'https://mahakacc.mahaksoft.com' + picture.Url;
    // } else {
    //   return 'assets/img_empty_product.png'; // Path to the default image in your assets folder
    // }
    return 'assets/img_empty_product.png';
  }

  decreaseQuantity() {
    
  }

  increaseQuantity() {

  }
}
