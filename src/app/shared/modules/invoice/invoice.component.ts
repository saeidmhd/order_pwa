import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Person } from 'src/app/core/models/Person';
import { OrderDetail } from 'src/app/core/models/order-detail';
import { Product } from 'src/app/core/models/product';
import { ProductDetail } from 'src/app/core/models/product-detail';
import { IndexedDbService } from 'src/app/core/services/indexed-db.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  invoiceForm: FormGroup;
  people: Person[] = []; // Assuming customer data is available
  products: Product[] = []; // Assuming product data is available
  productDetails: ProductDetail[] = []; // Product details
  selectedCustomer: Person | null = null;
  invoiceItems: OrderDetail[] = [];
  subtotal: number = 0;
  taxRate: number = 0.1; // Example tax rate (10%)
  total: number = 0;
  productPrices: number[] = []; // Array to hold product prices
  selectedProductDetail: ProductDetail | undefined = undefined; // Selected product detail
  displayedColumns: string[] = ['product', 'quantity', 'price', 'action'];

  constructor(
    private formBuilder: FormBuilder,
    private indexedDbService: IndexedDbService
  ) {
    this.invoiceForm = this.formBuilder.group({
      customer: [null, Validators.required],
      product: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });

    this.fetchProductsAndProductDetails();
    this.fetchPeople();
  }
  fetchPeople() {
    this.indexedDbService.getPeople().then(people => {
      this.people = people;
    });  }

  fetchProductsAndProductDetails(): void {
    this.indexedDbService.getProducts().then(products => {
      this.products = products;
    });

    this.indexedDbService.getProductDetails().then(productDetails => {
      this.productDetails = productDetails;
    });
  }

  updateProductPrice(): void {
    console.log("here2")
    const selectedProductId = this.invoiceForm.get('product')?.value.ProductId;
    console.log(selectedProductId)
    this.selectedProductDetail = this.productDetails.find(detail => detail.ProductId === selectedProductId);
    console.log(this.selectedProductDetail)

    if (this.selectedProductDetail) {
      // Clear existing prices
      this.productPrices = [];
      // Add prices from Price1 to Price10 to the productPrices array
      for (let i = 1; i <= 10; i++) {
        const price = this.selectedProductDetail[`Price${i}`];
        if (price !== null && !isNaN(price)) {
          this.productPrices.push(price);
        }
      }
      console.log(this.productPrices)
      // Set the default price as the first option
      this.invoiceForm.get('price')?.setValue(this.productPrices[0]);
    }
  }

  getProductName(productDetailId: number): string {
    const productDetail = this.productDetails.find(detail => detail.ProductDetailId === productDetailId);
    if (productDetail) {
      const product = this.products.find(product => product.ProductId === productDetail.ProductId);
      return product ? product.Name : 'Unknown';
    }
    return 'Unknown';
  }

  // Add an item to the invoice
 // Add an item to the invoice
 addItemToInvoice(): void {
  const selectedProduct = this.invoiceForm.get('product')?.value as Product;
  const quantity = this.invoiceForm.get('quantity')?.value;
  const price = this.invoiceForm.get('price')?.value;

  if (this.selectedProductDetail && typeof price === 'number') {
    const totalPrice = price * quantity;
    const orderDetail: OrderDetail = {
      ProductDetailId: this.selectedProductDetail.ProductDetailId,
      Count1: quantity,
      Price: totalPrice,
      OrderDetailId: 0,
      OrderDetailClientId: 0,
      ItemType: 0,
      OrderId: 0,
      IncomeId: 0,
      Count2: 0,
      PromotionCode: 0,
      Gift: 0,
      Description: '',
      Discount: 0,
      DiscountType: 0,
      TaxPercent: 0,
      ChargePercent: 0,
      StoreId: 0,
      Width: 0,
      Height: 0,
      ItemCount: 0,
      RowId: 0,
      Deleted: false,
      DataHash: '',
      CreateDate: '',
      UpdateDate: '',
      CreateSyncId: 0,
      UpdateSyncId: 0,
      RowVersion: 0,
      OrderClientId: 0,
      OrderCode: 0,
      ProductDetailClientId: 0,
      ProductDetailCode: 0
    };
    this.invoiceItems.push(orderDetail);
    console.log(this.invoiceItems)
    this.calculateTotal();
   // this.invoiceForm.reset({ quantity: 1 });
  }
  
}

  // Remove an item from the invoice
  removeItemFromInvoice(index: number): void {
    this.invoiceItems.splice(index, 1);
    this.calculateTotal();
  }

  // Calculate subtotal, tax, and total
  calculateTotal(): void {
    this.subtotal = this.invoiceItems.reduce((acc, item) => acc + item.Price, 0);
    const tax = this.subtotal * this.taxRate;
    this.total = this.subtotal + tax;
  }

  // Reset the form and invoice
  resetInvoice(): void {
    this.invoiceForm.reset({ quantity: 1 });
    this.invoiceItems = [];
    this.subtotal = 0;
    this.total = 0;
  }

  // Submit the invoice
  submitInvoice(): void {
    const customerId = this.invoiceForm.get('customer')?.value.id;
    const order = {
      customerId: customerId,
      orderDetails: this.invoiceItems,
      totalAmount: this.total
    };
    // Implement logic to save the order (e.g., send to backend)
    console.log('Submitted Invoice:', order);
    this.resetInvoice();
  }
  
}
