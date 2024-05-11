import { Component, Input } from '@angular/core';
import { IBazaraProduct } from 'src/app/core/models/bazara/bazara-DTOs/IBazaraProduct';

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
    // if (typeof product.quantity === 'number' && !isNaN(product.quantity) && product.quantity > 0) {
    //   product.quantity--; // Decrement the quantity if it's greater than 0
    // } else {
    //   // If quantity is not a valid number or already 0, set it to 0
    //   product.quantity = 0;
    // }
  }

  increaseQuantity() {
    // if (typeof product.quantity === 'number' && !isNaN(product.quantity)) {
    //   product.quantity++; // Increment the quantity
    // } else {
    //   // If quantity is not a valid number, set it to 1
    //   product.quantity = 1;
    // }
  }
}