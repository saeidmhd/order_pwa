import { Component, Input } from '@angular/core';
import { IBazaraProduct } from 'src/app/shared/models/bazara-models/bazara-DTOs/IBazaraProduct';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
 
  @Input() product!: IBazaraProduct;
  isLoading = false;

  decreaseQuantity() {
    
  }

  increaseQuantity() {

  }
}
