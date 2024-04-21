import { Component, OnInit } from '@angular/core';

import { GenericIndexedDbService } from '../../services/indexed-db/generic-indexed-db.service';
import { IGetBazaraData } from '../../models/bazara/get-all-data-DTOs/IGetBazaraData';
import { BazaraService } from '../../services/bazara/bazara.service';
import { IBazaraPersonAddress } from '../../models/bazara/bazara-DTOs/IBazaraPersonAddress';
import { IApiResult } from '../../models/bazara/get-all-data-DTOs/IApiResult';
import { IBazaraPerson } from '../../models/bazara/bazara-DTOs/IBazaraPerson';
import { IBazaraProduct } from '../../models/bazara/bazara-DTOs/IBazaraProduct';
import { IBazaraVisitorProduct } from '../../models/bazara/bazara-DTOs/IBazaraVisitorProduct';
import { IBazaraProductDetail } from '../../models/bazara/bazara-DTOs/IBazaraProductDetail';
import { IBazaraPhotoGallery } from '../../models/bazara/bazara-DTOs/IBazaraPhotoGallery';
import { IBazaraPicture } from '../../models/bazara/bazara-DTOs/IBazaraPicture';
import { IBazaraProductDetailStoreAsset } from '../../models/bazara/bazara-DTOs/IBazaraProductDetailAssetStore';

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

  constructor(private genericIndexedDbService: GenericIndexedDbService, private bazaraService: BazaraService) { }

  ngOnInit(): void {
    this.fetchAllData();
  }

  async fetchAllData() {
    if (this.terminate == false) {
      // await this.fetchPeople_VisitorPeople();
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
      // await firstValueFrom(this.peopleService.getPeople());
      // this.peopleReceived = true;
      // Store people in IndexedDB

      this.maxRowVersionModel.fromPersonVersion = await this.genericIndexedDbService.getMaxRowVersion('Person');
      this.maxRowVersionModel.fromVisitorPersonVersion = await this.genericIndexedDbService.getMaxRowVersion('VisitorPerson');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            const visitorId = localStorage.getItem(('VisitorId'))!;
            let people: IBazaraPerson[] = res.Data.Objects.People;
            // let visitorPeople: IBazaVisi
            people.forEach(ele => {
              ele.VisitorId = visitorId
            });

            // this.genericIndexedDbService.insertingToDb('Person', people);
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

  private async fetchVisitorPeople(): Promise<void> {
    try {
      // await firstValueFrom(this.visitorPeopleService.getVisitorPeople());
      // await this.visitorPeopleService.getVisitorPeople();
      // this.visitorPeopleReceived = true;
    } catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }

  private async fetchPersonAddresses() {
    try {
      this.maxRowVersionModel.fromPersonAddressVersion = await this.genericIndexedDbService.getMaxRowVersion('PersonAddress');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            let obj: IBazaraPersonAddress[] = res.Data.Objects.PersonAddresses;
            
            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.PersonAddressId];
                this.genericIndexedDbService.addOrEdit('PersonAddress', ele, key);
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
      this.maxRowVersionModel.fromProductVersion = await this.genericIndexedDbService.getMaxRowVersion('Product');
      this.maxRowVersionModel.fromVisitorProductVersion = await this.genericIndexedDbService.getMaxRowVersion('VisitorProduct');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            let products: IBazaraProduct[] = res.Data.Objects.Products;
            let visitorProducts: IBazaraVisitorProduct[] = res.Data.Objects.VisitorProducts;
            
            if (products.length > 0) {
              products.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.ProductId];
                this.genericIndexedDbService.addOrEdit('Product', ele, key);
              });
            }

            if (visitorProducts.length > 0) {
              visitorProducts.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.VisitorProductId];
                this.genericIndexedDbService.addOrEdit('VisitorProduct', ele, key);
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
      this.maxRowVersionModel.fromProductDetailVersion = await this.genericIndexedDbService.getMaxRowVersion('ProductDetail');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            let obj: IBazaraProductDetail[] = res.Data.Objects.ProductDetails;
            
            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.ProductDetailId];
                this.genericIndexedDbService.addOrEdit('ProductDetail', ele, key);
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
      this.maxRowVersionModel.fromPhotoGalleryVersion = await this.genericIndexedDbService.getMaxRowVersion('PhotoGallery');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            let obj: IBazaraPhotoGallery[] = res.Data.Objects.PhotoGalleries;
            
            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.PhotoGalleryId];
                this.genericIndexedDbService.addOrEdit('PhotoGallery', ele, key);
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
      this.maxRowVersionModel.fromPictureVersion = await this.genericIndexedDbService.getMaxRowVersion('Picture');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            let obj: IBazaraPicture[] = res.Data.Objects.Pictures;
            
            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.PictureId];
                this.genericIndexedDbService.addOrEdit('Picture', ele, key);
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
      this.maxRowVersionModel.fromProductDetailStoreAssetVersion = await this.genericIndexedDbService.getMaxRowVersion('ProductDetailStoreAsset');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            let obj: IBazaraProductDetailStoreAsset[] = res.Data.Objects.ProductDetailStoreAssets;
            
            if (obj.length > 0) {
              obj.forEach(ele => {
                const key: IDBValidKey = [+this.visitorId, ele.ProductDetailStoreAssetId];
                this.genericIndexedDbService.addOrEdit('ProductDetailStoreAsset', ele, key);
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