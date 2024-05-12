import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/core/models/old/Person';
import { Order } from 'src/app/core/models/old/order';
import { OrderDetail } from 'src/app/core/models/old/order-detail';
import { Product } from 'src/app/core/models/old/product';
import { ProductDetail } from 'src/app/core/models/old/product-detail';
import { IndexedDbService } from 'src/app/core/services/indexed-db/indexed-db.service';
// import { IndexedDbService } from 'src/app/core/services/indexed-db.service';
// import { PersonSelectionService } from 'src/app/core/services/person-selection.service';


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
  taxRate: number = 0; // Example tax rate (10%)
  total: number = 0;
  productPrices: number[] = []; // Array to hold product prices
  selectedProductDetail: ProductDetail | undefined = undefined; // Selected product detail
  displayedColumns: string[] = ['product', 'quantity', 'price', 'action'];
  visitorId = localStorage.getItem(('VisitorId'))!;

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
    this.indexedDbService.getAllData<Person>("Person").then((people: Person[]) => {
      this.people = people;
    });
}


fetchProductsAndProductDetails(): void {
  this.indexedDbService.getAllData<Product>("Product").then((products: Product[]) => {
    this.products = products;
  });

  this.indexedDbService.getAllData<ProductDetail>("ProductDetail").then((productDetails: ProductDetail[]) => {
    this.productDetails = productDetails;
  });
}


  updateProductPrice(): void {
    const selectedProductId = this.invoiceForm.get('product')?.value.ProductId;
    this.selectedProductDetail = this.productDetails.find(detail => detail.ProductId === selectedProductId);

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

    const now = new Date();
    const iranTimeOffset = 3.5;
    const localTime = new Date(now.getTime() + iranTimeOffset * 60 * 60 * 1000);
    const createDate = localTime.toISOString().replace('Z', '');

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
        CreateDate: createDate,
        UpdateDate: createDate,
        CreateSyncId: 0,
        UpdateSyncId: 0,
        RowVersion: 0,
        OrderClientId: 0,
        OrderCode: 0,
        ProductDetailClientId: 0,
        ProductDetailCode: 0
      };
      this.invoiceItems.push(orderDetail);
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
  async submitInvoice(): Promise<void>  {

    const orderClientId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

    const now = new Date();
    const iranTimeOffset = 3.5;
    const localTime = new Date(now.getTime() + iranTimeOffset * 60 * 60 * 1000);
    const createDate = localTime.toISOString().replace('Z', '');

    const customerId = this.invoiceForm.get('customer')?.value.PersonId;

    const visitorId = this.indexedDbService.getVisitorId()
    let visitorIdnum = 0;
    if (visitorId !== undefined) {
       visitorIdnum = Number(visitorId);
    }
      
    const order: Order = {
      OrderId: orderClientId, // Server-side order ID
      OrderClientId: orderClientId, // Client-side order ID
      PersonId: customerId, // Server-side customer ID
      PersonClientId: 0,
      OrderCode: 0,
      VisitorId: visitorIdnum,
      ReceiptId: 0,
      OrderType: 1,
      OrderDate: createDate,
      DeliveryDate: createDate,
      Discount: 0,
      DiscountType: 0,
      SendCost: 0,
      OtherCost: 0,
      SettlementType: 0,
      Immediate: false,
      ReturnReasonId: 0,
      Description: '',
      ExpenseId: 0,
      ProjectId: 0,
      Latitude: 0,
      Longitude: 0,
      ShippingAddress: '',
      CarrierType: '',
      CarrierID: '',
      DriverCurrencyType: '',
      CarryingAsExpense: false,
      ReferenceOrderId: 0,
      //InvoiceTemplate: '',
      Deleted: false,
      DataHash: '',
      CreateDate: createDate,
      UpdateDate: createDate,
      CreateSyncId: 0,
      UpdateSyncId: 0,
      RowVersion: 0,
      PersonCode: 0,
      VisitorClientId: 0,
      VisitorCode: 0,
      ReceiptClientId: 0,
      ReceiptCode: 0,
      InvoiceTemplate: ''
    };

    const orderDetails = this.invoiceItems.map(item => {
      const orderDetailClientId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
      const orderDetail: OrderDetail = {
        OrderDetailId: orderDetailClientId, // Server-side order detail ID
        OrderDetailClientId: orderDetailClientId, // Client-side order detail ID
        ProductDetailId: item.ProductDetailId, // Server-side product detail ID
        ProductDetailClientId: 0,
        ItemType: 0,
        OrderClientId: orderClientId,
        IncomeId: 0,
        Price: item.Price,
        Count1: item.Count1,
        Count2: item.Count2,
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
        CreateDate: createDate,
        UpdateDate: createDate,
        CreateSyncId: 0,
        UpdateSyncId: 0,
        RowVersion: 0,
        OrderCode: 0,
        ProductDetailCode: 0,
        OrderId: orderClientId
      };
      return orderDetail;
    });

    try {
      // Store the order in IndexedDB
      const order_key: IDBValidKey = [+this.visitorId, order.OrderClientId];
      await this.indexedDbService.addOrEdit<Order>("Order", order, order_key);
      console.log('Successfully stored order in IndexedDB');
    
      // Store the order details in IndexedDB
      for (let detail of orderDetails) {
        const orderDetail_key: IDBValidKey = [+this.visitorId, detail.OrderDetailClientId];
        await this.indexedDbService.addOrEdit<OrderDetail>("OrderDetail", detail, orderDetail_key);
      }
      console.log('Successfully stored order details in IndexedDB');
    } catch (error) {
      console.error('Error storing order and order details in IndexedDB:', error);
      // Handle the error appropriately (e.g., display a user-friendly message)
    }
    

    this.resetInvoice();
  }

}