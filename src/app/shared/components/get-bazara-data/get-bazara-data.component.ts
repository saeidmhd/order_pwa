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

@Component({
  selector: 'app-get-bazara-data',
  standalone: true,
  imports: [],
  templateUrl: './get-bazara-data.component.html',
  styleUrl: './get-bazara-data.component.css'
})
export class GetBazaraDataComponent implements OnInit {

  terminate: boolean = false;
  maxRowVersionModel: IGetBazaraData = {};
  visitorId = localStorage.getItem(('VisitorId'))!;

  constructor(private indexedDbService: IndexedDbService, private bazaraService: BazaraService) { }

  ngOnInit(): void {
    this.fetchAllData();
  }

  async fetchAllData() {
    if (this.terminate == false) {
      await this.fetchPeople_VisitorPeople();
    }
    if (this.terminate == false) {
      await this.fetchPersonAddresses();
    }
    if (this.terminate == false) {
      await this.fetchProduct_VisitorProduct();
    }
    if (this.terminate == false) {
      await this.fetchProductDetail();
    }
    if (this.terminate == false) {
      await this.fetchPicture();
    }
    if (this.terminate == false) {
      await this.fetchPhotoGallery();
    }
    if (this.terminate == false) {
      await this.fetchProductDetailStoreAsset();
    }
  }

  private async fetchPeople_VisitorPeople(): Promise<void> {
    try {
      this.maxRowVersionModel.fromPersonVersion = await this.indexedDbService.getMaxRowVersion('Person');
      this.maxRowVersionModel.fromVisitorPersonVersion = await this.indexedDbService.getMaxRowVersion('VisitorPerson');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
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

  private async fetchPersonAddresses() {
    try {
      this.maxRowVersionModel.fromPersonAddressVersion = await this.indexedDbService.getMaxRowVersion('PersonAddress');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
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

  private async fetchProduct_VisitorProduct() {
    try {
      this.maxRowVersionModel.fromProductVersion = await this.indexedDbService.getMaxRowVersion('Product');
      this.maxRowVersionModel.fromVisitorProductVersion = await this.indexedDbService.getMaxRowVersion('VisitorProduct');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
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

  private async fetchProductDetail() {
    try {
      this.maxRowVersionModel.fromProductDetailVersion = await this.indexedDbService.getMaxRowVersion('ProductDetail');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
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

  private async fetchPhotoGallery() {
    try {
      this.maxRowVersionModel.fromPhotoGalleryVersion = await this.indexedDbService.getMaxRowVersion('PhotoGallery');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
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

  private async fetchPicture() {
    try {
      this.maxRowVersionModel.fromPictureVersion = await this.indexedDbService.getMaxRowVersion('Picture');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
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
}