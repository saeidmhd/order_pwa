import { Component, OnInit } from '@angular/core';
import { firstValueFrom, EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { BanksService } from '../../../core/services/banks.service';
import { PeopleService } from '../../../core/services/people.service';
import { ProductService } from '../../../core/services/product.service';
import { ProductDetailService } from '../../../core/services/product-detail.service';
import { VisitorPeopleService } from 'src/app/core/services/visitor-person.service';
import { OrdersService } from 'src/app/core/services/order.service';
import { OrderDetailsService } from 'src/app/core/services/order-details.service';
import { ProductCategoryService } from 'src/app/core/services/product-category.service';
import { PhotoGalleryService } from 'src/app/core/services/photo-gallery.service';
import { PictureService } from 'src/app/core/services/picture.service';
import { VisitorProductService } from 'src/app/core/services/visitor-product.service';

@Component({
    selector: 'app-update-info',
    templateUrl: './update-info.component.html',
    styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
    isLoading = false;
    banksReceived = false;
    peopleReceived = false;
    productsReceived = false;
    productDetailsReceived = false;
    visitorPeopleReceived = false;
    ordersReceived = false;
    orderDetailsReceived = false;
    productCategoriesReceived = false;
    photoGalleriesReceived = false;
    picturesReceived = false;
    visitorProductReceived = false;
    ordersSent = false;
    orderDetailsSent = false;

    constructor(
        private banksService: BanksService,
        private peopleService: PeopleService,
        private productService: ProductService,
        private productDetailService: ProductDetailService,
        private visitorPeopleService: VisitorPeopleService,
        private ordersService: OrdersService,
        private orderDetailsService: OrderDetailsService,
        private productCategoryService: ProductCategoryService,
        private photoGalleryService: PhotoGalleryService,
        private pictureService: PictureService,
        private visitorProductService: VisitorProductService,
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.fetchData();
        this.saveOrdersToServer().subscribe({
            next: () => this.saveOrderDetailsToServer(),
            error: err => console.error('Error saving orders to server:', err)
          });
    }
    saveOrdersToServer(): Observable<any> {
        return this.ordersService.saveOrders().pipe(
          tap(() => {
            this.ordersSent = true;
            console.log('Orders saved to server successfully');
          }),
          catchError(error => {
            console.error('Error saving orders to server:', error);
            throw error;
          })
        );
    }

    private async saveOrderDetailsToServer(): Promise<void> {
        try {
            await firstValueFrom(this.orderDetailsService.saveOrderDetails());
            this.orderDetailsSent = true
            console.log('orderDetails saved to server successfully');
        } catch (error) {
            console.error('Error saving orderDetails to server:', error);
        }
    }

    private fetchData(): void {
        this.fetchBanks();
        this.fetchPeople();
        this.fetchProducts();
        this.fetchProductDetails();
        this.fetchVisitorPeople();
        this.fetchOrders();
        this.fetchOrderDetails();
        this.fetchProductCategories();
        this.fetchPhotoGalleries();
        this.fetchPictures();
        this.fetchVisitorProducts();
    }

    private async fetchBanks(): Promise<void> {
        try {
            await firstValueFrom(this.banksService.getBanks());
            this.banksReceived = true;
            // Store banks in IndexedDB
        } catch (error) {
            console.error('Error fetching banks:', error);
        }
    }

    private async fetchPeople(): Promise<void> {
        try {
            await firstValueFrom(this.peopleService.getPeople());
            this.peopleReceived = true;
            // Store people in IndexedDB
        } catch (error) {
            console.error('Error fetching people:', error);
        }
    }

    private async fetchProducts(): Promise<void> {
        try {
            await firstValueFrom(this.productService.getProducts());
            this.productsReceived = true;
            // Store products in IndexedDB
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Repeat the pattern for other fetch methods

    private async fetchProductDetails(): Promise<void> {
        try {
            await firstValueFrom(this.productDetailService.getProductDetails());
            this.productDetailsReceived = true;
            // Store product details in IndexedDB
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    private async fetchVisitorPeople(): Promise<void> {
        try {
            await firstValueFrom(this.visitorPeopleService.getVisitorPeople());
            this.visitorPeopleReceived = true;
        } catch (error) {
            console.error('Error fetching visitor people:', error);
        }
    }

    private async fetchOrders(): Promise<void> {
        try {
            await firstValueFrom(this.ordersService.getOrders());
            this.ordersReceived = true;
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    private async fetchOrderDetails(): Promise<void> {
        try {
            await firstValueFrom(this.orderDetailsService.getOrderDetails());
            this.orderDetailsReceived = true;
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    }

    private async fetchProductCategories(): Promise<void> {
        try {
            await firstValueFrom(this.productCategoryService.getProductCategories());
            this.productCategoriesReceived = true;
        } catch (error) {
            console.error('Error fetching product categories:', error);
        }
    }

    private async fetchPhotoGalleries(): Promise<void> {
        try {
            await firstValueFrom(this.photoGalleryService.getPhotoGalleries());
            this.photoGalleriesReceived = true;
        } catch (error) {
            console.error('Error fetching photo galleries:', error);
        }
    }

    private async fetchPictures(): Promise<void> {
        try {
            await firstValueFrom(this.pictureService.getPictures());
            this.picturesReceived = true;
        } catch (error) {
            console.error('Error fetching pictures:', error);
        }
    }

    private async fetchVisitorProducts(): Promise<void> {
        try {
            await firstValueFrom(this.visitorProductService.getVisitorProducts());
            this.visitorProductReceived = true;
        } catch (error) {
            console.error('Error fetching visitor products:', error);
        } finally {
            this.isLoading = false; // Set isLoading to false regardless of success or failure
        }
    }

}