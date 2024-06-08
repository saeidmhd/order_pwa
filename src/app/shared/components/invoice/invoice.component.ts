import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertyDescription } from 'src/app/core/models/bazara/bazara-DTOs/property-description';
import { Person } from 'src/app/core/models/old/Person';
import { Order } from 'src/app/core/models/old/order';
import { OrderDetail } from 'src/app/core/models/bazara/bazara-DTOs/order-detail';
import { Product } from 'src/app/core/models/old/product';
import { ProductDetail } from 'src/app/core/models/old/product-detail';
import { IndexedDbService } from 'src/app/core/services/indexed-db/indexed-db.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  getPropertyTitle(propertyCode: string): string {
  const propertyCodeNumber = Number(propertyCode);
  const property = this.propertyDescriptions.find(desc => desc.PropertyDescriptionCode === propertyCodeNumber);
  return property ? property.Title : 'Unknown Property';
}

  invoiceForm: FormGroup;
  people: Person[] = [];
  products: Product[] = [];
  productDetails: ProductDetail[] = [];
  propertyDescriptions: PropertyDescription[] = [];
  selectedCustomer: Person | null = null;
  invoiceItems: OrderDetail[] = [];
  subtotal: number = 0;
  taxRate: number = 0;
  total: number = 0;
  productPrices: number[] = [];
  selectedProductDetails: ProductDetail[] = [];
  selectedProductProperties: string = '';
  selectedProductDetail: ProductDetail | undefined = undefined;
  displayedColumns: string[] = ['product', 'quantity', 'price', 'action'];
  visitorId = localStorage.getItem('VisitorId')!;

  constructor(
    private formBuilder: FormBuilder,
    private indexedDbService: IndexedDbService
  ) {
    this.invoiceForm = this.formBuilder.group({
      customer: [null, Validators.required],
      product: [null, Validators.required],
      productDetail: [null, Validators.required],
      productProperty: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.fetchProductsAndProductDetails();
    this.fetchPeople();
    this.fetchPropertyDescriptions();
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

  fetchPropertyDescriptions(): void {
    this.indexedDbService.getAllData<PropertyDescription>("PropertyDescription").then((propertyDescriptions: PropertyDescription[]) => {
      this.propertyDescriptions = propertyDescriptions;
    });
  }

  updateProductDetails(): void {
    const selectedProductId = this.invoiceForm.get('product')?.value.ProductId;
    this.selectedProductDetails = this.productDetails.filter(detail => detail.ProductId === selectedProductId);

    if (this.selectedProductDetails.length > 0) {
      this.invoiceForm.get('productDetail')?.setValue(this.selectedProductDetails[0]);
      this.onProductDetailChange();

      // If there is only one product detail, ensure the price is updated
      if (this.selectedProductDetails.length === 1) {
        this.updateProductPrice({ C: '', V: '' });
      }
    }
  }

  onProductDetailChange(): void {
    this.selectedProductDetail = this.invoiceForm.get('productDetail')?.value;
    if (this.selectedProductDetail) {
      this.selectedProductProperties = this.parseProperties(this.selectedProductDetail.Properties);
      console.log(this.selectedProductProperties);
      
      if (this.selectedProductProperties.length > 0) {
        console.log(this.selectedProductProperties[0]);
        this.invoiceForm.get('productProperty')?.setValue(this.selectedProductProperties);
        this.onProductPropertyChange();
      } else {
        // If there are no properties, call updateProductPrice directly
        this.updateProductPrice({ C: '', V: '' });
      }
    }
  }

  onProductPropertyChange(): void {
    const selectedProperty = this.invoiceForm.get('productProperty')?.value;
    if (this.selectedProductDetail && selectedProperty) {
      // Update price based on the selected property
      this.updateProductPrice(selectedProperty);
    }
  }

  updateProductPrice(_selectedProperty: { C: string, V: string }): void {
    if (this.selectedProductDetail) {
      this.productPrices = [];
      for (let i = 1; i <= 10; i++) {
        const price = this.selectedProductDetail[`Price${i}`];
        if (price !== null && !isNaN(price)) {
          this.productPrices.push(price);
        }
      }
      this.invoiceForm.get('price')?.setValue(this.productPrices[0]);
    }
  }

  parseProperties (propertiesString: string | null | undefined): string {
    if (!propertiesString) return '';
    try {
      const properties = JSON.parse(propertiesString) as { C: string, V: string }[];
      return properties.map(prop => `${this.getPropertyTitle(prop.C)}: ${prop.V}`).join(', ');
    } catch (error) {
      console.error('Error parsing properties:', error);
      return '';
    }
  }

  getProductDetailDescription(productDetail: ProductDetail): string {
    return productDetail.Properties || 'No Description';
  }

  getProductName(productDetailId: number): string {
    const productDetail = this.productDetails.find(detail => detail.ProductDetailId === productDetailId);
    if (productDetail) {
      const product = this.products.find(product => product.ProductId === productDetail.ProductId);
      return product ? product.Name : 'Unknown';
    }
    return 'Unknown';
  }

  addItemToInvoice(): void {
    const now = new Date();
    const iranTimeOffset = 3.5;
    const localTime = new Date(now.getTime() + iranTimeOffset * 60 * 60 * 1000);
    const createDate = localTime.toISOString().replace('Z', '');

    const selectedProductDetail = this.invoiceForm.get('productDetail')?.value as ProductDetail;
    const quantity = this.invoiceForm.get('quantity')?.value;
    const price = this.invoiceForm.get('price')?.value;

    if (selectedProductDetail && typeof price === 'number') {
      const totalPrice = price * quantity;
      const orderDetail: OrderDetail = {
        ProductDetailId: selectedProductDetail.ProductDetailId,
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
    }
  }

  removeItemFromInvoice(index: number): void {
    this.invoiceItems.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.subtotal = this.invoiceItems.reduce((acc, item) => acc + item.Price, 0);
    const tax = this.subtotal * this.taxRate;
    this.total = this.subtotal + tax;
  }

  resetInvoice(): void {
    this.invoiceForm.reset({ quantity: 1 });
    this.invoiceItems = [];
    this.subtotal = 0;
    this.total = 0;
  }

  async submitInvoice(): Promise<void> {
    const orderClientId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

    const now = new Date();
    const iranTimeOffset = 3.5;
    const localTime = new Date(now.getTime() + iranTimeOffset * 60 * 60 * 1000);
    const createDate = localTime.toISOString().replace('Z', '');

    const customerId = this.invoiceForm.get('customer')?.value.PersonId;

    const visitorId = this.indexedDbService.getVisitorId();
    let visitorIdnum = 0;
    if (visitorId !== undefined) {
      visitorIdnum = Number(visitorId);
    }

    const order: Order = {
      OrderId: orderClientId,
      OrderClientId: orderClientId,
      PersonId: customerId,
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
      InvoiceTemplate: '',
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
      ReceiptCode: 0
    };

    const orderDetails = this.invoiceItems.map(item => {
      const orderDetailClientId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
      const orderDetail: OrderDetail = {
        OrderDetailId: orderDetailClientId,
        OrderDetailClientId: orderDetailClientId,
        ProductDetailId: item.ProductDetailId,
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
      const order_key: IDBValidKey = [+this.visitorId, order.OrderClientId];
      await this.indexedDbService.addOrEdit<Order>("Order", order, order_key);
      console.log('Successfully stored order in IndexedDB');

      for (let detail of orderDetails) {
        const orderDetail_key: IDBValidKey = [+this.visitorId, detail.OrderDetailClientId];
        await this.indexedDbService.addOrEdit<OrderDetail>("OrderDetail", detail, orderDetail_key);
      }
      console.log('Successfully stored order details in IndexedDB');
    } catch (error) {
      console.error('Error storing order and order details in IndexedDB:', error);
    }

    this.resetInvoice();
  }
}
