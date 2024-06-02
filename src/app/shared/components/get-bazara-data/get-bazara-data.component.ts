import { Component, OnInit } from '@angular/core';

import { IndexedDbService } from '../../../core/services/indexed-db/indexed-db.service';

import { IGetBazaraData } from '../../../core/models/bazara/get-all-data-DTOs/IGetBazaraData';
import { BazaraService } from '../../../core/services/bazara/bazara.service';
import { IBazaraPersonAddress } from '../../../core/models/bazara/bazara-DTOs/IBazaraPersonAddress';
import { IApiResult } from '../../../core/models/bazara/get-all-data-DTOs/IApiResult';
import { IBazaraPerson } from '../../../core/models/bazara/bazara-DTOs/IBazaraPerson';
import { IBazaraVisitorPerson } from '../../../core/models/bazara/bazara-DTOs/IBazaraVisitorPerson';
import { IBazaraProduct } from '../../../core/models/bazara/bazara-DTOs/IBazaraProduct';
import { IBazaraVisitorProduct } from '../../../core/models/bazara/bazara-DTOs/IBazaraVisitorProduct';
import { IBazaraProductDetail } from '../../../core/models/bazara/bazara-DTOs/IBazaraProductDetail';
import { IBazaraPhotoGallery } from '../../../core/models/bazara/bazara-DTOs/IBazaraPhotoGallery';
import { IBazaraPicture } from '../../../core/models/bazara/bazara-DTOs/IBazaraPicture';
import { IBazaraProductDetailStoreAsset } from '../../../core/models/bazara/bazara-DTOs/IBazaraProductDetailAssetStore';
import { ReceivedBazaraData } from 'src/app/core/models/bazara/get-all-data-DTOs/ReceviedBazaraData';
import { Bank } from 'src/app/core/models/bazara/bazara-DTOs/Bank';
import { Mission } from 'src/app/core/models/bazara/bazara-DTOs/Mission';
import { MissionDetail } from 'src/app/core/models/bazara/bazara-DTOs/MissionDetail';
import { ProductCategory } from 'src/app/core/models/bazara/bazara-DTOs/product-category';
import { Order } from 'src/app/core/models/old/order';
import { OrderDetail } from 'src/app/core/models/old/order-detail';
import { PropertyDescription } from 'src/app/core/models/bazara/bazara-DTOs/property-description';

// rest of your code...



@Component({
  selector: 'app-get-bazara-data',
  standalone: true,
  imports: [],
  templateUrl: './get-bazara-data.component.html',
  styleUrl: './get-bazara-data.component.css'
})
export class GetBazaraDataComponent implements OnInit {

  terminate: boolean = false;
  dataStatus: ReceivedBazaraData = {};
  maxRowVersionModel: IGetBazaraData = {};
  visitorId = localStorage.getItem(('VisitorId'))!;

  constructor(private indexedDbService: IndexedDbService, private bazaraService: BazaraService) { }

  ngOnInit(): void {
    this.fetchAllData();
  }

  async fetchAllData() {
    if (this.terminate == false) {
      await this.fetchBanks();
    }
    if (this.terminate == false) {
      await this.fetchPeople_VisitorPeople();
    }
    if (this.terminate == false) {
      await this.fetchProduct_VisitorProducts();
    }
    if (this.terminate == false) {
      await this.fetchProductCategory();
    }
    if (this.terminate == false) {
      await this.fetchProductDetails();
    }
    if (this.terminate == false) {
      await this.fetchPictures();
    }
    if (this.terminate == false) {
      await this.fetchPhotoGalleries();
    }
    if (this.terminate == false) {
      await this.fetchOrders();
    }
    if (this.terminate == false) {
      await this.fetchOrderDetails();
    }
    if (this.terminate == false) {
      await this.fetchProductDetailStoreAsset();
    }
    if (this.terminate == false) {
      await this.fetchMissions();
    }
    if (this.terminate == false) {
      await this.fetchMissionDetails();
    }
    if (this.terminate == false) {
      await this.fetchPersonAddresses();
    }
    if (this.terminate == false) {
      await this.fetchPropertyDescriptions();
    }
  }
  private async fetchPeople_VisitorPeople(): Promise<void> {
    try {
      this.maxRowVersionModel.fromPersonVersion = await this.indexedDbService.getMaxRowVersion('Person');
      this.maxRowVersionModel.fromVisitorPersonVersion = await this.indexedDbService.getMaxRowVersion('VisitorPerson');
      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            this.dataStatus.peopleReceived = true;
            this.dataStatus.visitorPeopleReceived = true;
            let people: IBazaraPerson[] = res.Data.Objects.People;
            people.forEach(ele => {
              const key: IDBValidKey = [+this.visitorId, ele.PersonId];
              this.indexedDbService.addOrEdit('Person', ele, key);
            });

            let VisitorPeople: IBazaraVisitorPerson[] = res.Data.Objects.VisitorPeople;
            VisitorPeople.forEach(ele => {
              const key: IDBValidKey = [+this.visitorId, ele.VisitorPersonId];
              this.indexedDbService.addOrEdit('VisitorPerson', ele, key);
            })
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    } catch (error) {
      console.error('Error fetching people:', error);
      // if (error.Message == 'Unauthorized')
      this.terminate = true;
    }
  }
  private async fetchProductCategory(): Promise<void> {
    try {
      this.maxRowVersionModel.fromProductCategoryVersion = await this.indexedDbService.getMaxRowVersion('ProductCategory');
      console.log(this.maxRowVersionModel.fromProductCategoryVersion);
      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            this.dataStatus.productCategoriesReceived = true;
            let productCategory: ProductCategory[] = res.Data.Objects.ProductCategories;
            productCategory.forEach(ele => {
              const key: IDBValidKey = [+this.visitorId, ele.ProductCategoryId];
              this.indexedDbService.addOrEdit('ProductCategory', ele, key);
            });
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    } catch (error) {
      console.error('Error fetching productCategory:', error);
      this.terminate = true;
    }
  }
  private async fetchPersonAddresses() {
    try {
      this.maxRowVersionModel.fromPersonAddressVersion = await this.indexedDbService.getMaxRowVersion('PersonAddress');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            this.dataStatus.personAddressesReceived = true;
            let obj: IBazaraPersonAddress[] = res.Data.Objects.PersonAddresses;
            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.PersonAddressId];
                this.indexedDbService.addOrEdit('PersonAddress', ele, key);
              });
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }
  private async fetchProduct_VisitorProducts() {
    try {
      this.maxRowVersionModel.fromProductVersion = await this.indexedDbService.getMaxRowVersion('Product');
      this.maxRowVersionModel.fromVisitorProductVersion = await this.indexedDbService.getMaxRowVersion('VisitorProduct');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {

            this.dataStatus.productsReceived = true;
            this.dataStatus.visitorProductsReceived = true;

            let products: IBazaraProduct[] = res.Data.Objects.Products;
            let visitorProducts: IBazaraVisitorProduct[] = res.Data.Objects.VisitorProducts;

            if (products.length > 0) {
              products.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.ProductId];
                this.indexedDbService.addOrEdit('Product', ele, key);
              });
            }

            if (visitorProducts.length > 0) {
              visitorProducts.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.VisitorProductId];
                this.indexedDbService.addOrEdit('VisitorProduct', ele, key);
              });
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }
  private async fetchProductDetails() {
    try {
      this.maxRowVersionModel.fromProductDetailVersion = await this.indexedDbService.getMaxRowVersion('ProductDetail');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            this.dataStatus.productDetailsReceived = true;
            let obj: IBazaraProductDetail[] = res.Data.Objects.ProductDetails;

            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.ProductDetailId];
                this.indexedDbService.addOrEdit('ProductDetail', ele, key);
              });
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }
  private async fetchPhotoGalleries() {
    try {
      this.maxRowVersionModel.fromPhotoGalleryVersion = await this.indexedDbService.getMaxRowVersion('PhotoGallery');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            this.dataStatus.photoGalleriesReceived = true;
            let obj: IBazaraPhotoGallery[] = res.Data.Objects.PhotoGalleries;

            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.PhotoGalleryId];
                this.indexedDbService.addOrEdit('PhotoGallery', ele, key);
              });
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }
  private async fetchPictures() {
    try {
      this.maxRowVersionModel.fromPictureVersion = await this.indexedDbService.getMaxRowVersion('Picture');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            this.dataStatus.picturesReceived = true;
            let obj: IBazaraPicture[] = res.Data.Objects.Pictures;

            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.PictureId];
                this.indexedDbService.addOrEdit('Picture', ele, key);
              });
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }
  private async fetchProductDetailStoreAsset() {
    try {
      this.maxRowVersionModel.fromProductDetailStoreAssetVersion = await this.indexedDbService.getMaxRowVersion('ProductDetailStoreAsset');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {

            this.dataStatus.productDetailStoreAssetsReceived = true;

            let obj: IBazaraProductDetailStoreAsset[] = res.Data.Objects.ProductDetailStoreAssets;

            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.ProductDetailStoreAssetId];
                this.indexedDbService.addOrEdit('ProductDetailStoreAsset', ele, key);
              });
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }
  private async fetchBanks() {
    try {
      this.maxRowVersionModel.fromBankVersion = await this.indexedDbService.getMaxRowVersion('Bank');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {

            this.dataStatus.banksReceived = true;

            let obj: Bank[] = res.Data.Objects.Banks;

            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.BankId];
                this.indexedDbService.addOrEdit('Bank', ele, key);
              });
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }
  private async fetchMissions() {
    try {
      this.maxRowVersionModel.fromMissionVersion = await this.indexedDbService.getMaxRowVersion('Mission');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            this.dataStatus.missionsReceived = true;
            let obj: Mission[] = res.Data.Objects.Missions;

            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.MissionId];
                this.indexedDbService.addOrEdit('Mission', ele, key);
              });
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }
  private async fetchMissionDetails() {
    try {
      this.maxRowVersionModel.fromMissionDetailVersion = await this.indexedDbService.getMaxRowVersion('MissionDetail');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            this.dataStatus.missionDetailsReceived = true;
            let obj: MissionDetail[] = res.Data.Objects.MissionDetails;

            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.MissionDetailId];
                this.indexedDbService.addOrEdit('MissionDetail', ele, key);
              });
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }
  private async fetchOrders() {
    try {
      this.maxRowVersionModel.fromOrderVersion = await this.indexedDbService.getMaxRowVersion('Order');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            this.dataStatus.ordersReceived = true;
            let obj: Order[] = res.Data.Objects.Orders;

            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.OrderId];
                this.indexedDbService.addOrEdit('Order', ele, key);
              });
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching orders:', error);
      this.terminate = true;
    }
  }

  private async fetchOrderDetails() {
    try {
      this.maxRowVersionModel.fromOrderDetailVersion = await this.indexedDbService.getMaxRowVersion('OrderDetail');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            this.dataStatus.orderDetailsReceived = true;
            let obj: OrderDetail[] = res.Data.Objects.OrderDetails;

            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.OrderDetailId];
                this.indexedDbService.addOrEdit('OrderDetail', ele, key);
              });
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching order detials:', error);
      this.terminate = true;
    }
  }

  private async fetchPropertyDescriptions() {
    try {
      this.maxRowVersionModel.fromPropertyDescriptionVersion = await this.indexedDbService.getMaxRowVersion('PropertyDescription');
      console.log("fromPropertyDescriptionVersion" + this.maxRowVersionModel.fromPropertyDescriptionVersion);

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            this.dataStatus.propertyDescriptionsReceived = true;
            let obj: PropertyDescription[] = res.Data.Objects.PropertyDescriptions;

            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.PropertyDescriptionId];
                this.indexedDbService.addOrEdit('PropertyDescription', ele, key);
              });
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching PropertyDescriptions:', error);
      this.terminate = true;
    }
  }
}