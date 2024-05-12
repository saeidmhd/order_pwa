import { Component, OnInit } from '@angular/core';

import { GenericIndexedDbService } from '../../../core/services/indexed-db/generic-indexed-db.service';
import { GetDataBody } from '../../../core/models/get-all-data/GetDataBody';
import { BazaraService } from '../../../core/services/bazara/bazara.service';
import { PersonAddress } from '../../../core/models/models/PersonAddress';
import { ApiResult } from '../../../core/models/get-all-data/GetDataResponse';
import { Person } from '../../../core/models/models/Person';
import { Product } from '../../../core/models/models/Product';
import { VisitorProduct } from '../../../core/models/models/VisitorProduct';
import { ProductDetail } from '../../../core/models/models/ProductDetail';
import { PhotoGallery } from '../../../core/models/models/PhotoGallery';
import { Picture } from '../../../core/models/models/Picture';
import { ProductDetailStoreAsset } from '../../../core/models/models/ProductDetailAssetStore';

@Component({
  selector: 'app-get-bazara-data',
  standalone: true,
  imports: [],
  templateUrl: './get-bazara-data.component.html',
  styleUrl: './get-bazara-data.component.css'
})
export class GetBazaraDataComponent implements OnInit {

  terminate: boolean = false;
  getDataBody: GetDataBody = {};
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

      this.getDataBody.fromPersonVersion = await this.genericIndexedDbService.getMaxRowVersion('Person');
      this.getDataBody.fromVisitorPersonVersion = await this.genericIndexedDbService.getMaxRowVersion('VisitorPerson');

      this.bazaraService.getBazaraData(this.getDataBody!).subscribe({
        next: (res: ApiResult) => {
          if (res.Result) {
            const visitorId = localStorage.getItem(('VisitorId'))!;
            let people: Person[] = res.Data.Objects.People;
            // let visitorPeople: IBazaVisi
            // people.forEach(ele => {
            //   ele.VisitorId = visitorId
            // });

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
      this.getDataBody.fromPersonAddressVersion = await this.genericIndexedDbService.getMaxRowVersion('PersonAddress');

      this.bazaraService.getBazaraData(this.getDataBody!).subscribe({
        next: (res: ApiResult) => {
          if (res.Result) {
            let obj: PersonAddress[] = res.Data.Objects.PersonAddresses;
            
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
      this.getDataBody.fromProductVersion = await this.genericIndexedDbService.getMaxRowVersion('Product');
      this.getDataBody.fromVisitorProductVersion = await this.genericIndexedDbService.getMaxRowVersion('VisitorProduct');

      this.bazaraService.getBazaraData(this.getDataBody!).subscribe({
        next: (res: ApiResult) => {
          if (res.Result) {
            let products: Product[] = res.Data.Objects.Products;
            let visitorProducts: VisitorProduct[] = res.Data.Objects.VisitorProducts;
            
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
      this.getDataBody.fromProductDetailVersion = await this.genericIndexedDbService.getMaxRowVersion('ProductDetail');

      this.bazaraService.getBazaraData(this.getDataBody!).subscribe({
        next: (res: ApiResult) => {
          if (res.Result) {
            let obj: ProductDetail[] = res.Data.Objects.ProductDetails;
            
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
      this.getDataBody.fromPhotoGalleryVersion = await this.genericIndexedDbService.getMaxRowVersion('PhotoGallery');

      this.bazaraService.getBazaraData(this.getDataBody!).subscribe({
        next: (res: ApiResult) => {
          if (res.Result) {
            let obj: PhotoGallery[] = res.Data.Objects.PhotoGalleries;
            
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
      this.getDataBody.fromPictureVersion = await this.genericIndexedDbService.getMaxRowVersion('Picture');

      this.bazaraService.getBazaraData(this.getDataBody!).subscribe({
        next: (res: ApiResult) => {
          if (res.Result) {
            let obj: Picture[] = res.Data.Objects.Pictures;
            
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
      this.getDataBody.fromProductDetailStoreAssetVersion = await this.genericIndexedDbService.getMaxRowVersion('ProductDetailStoreAsset');

      this.bazaraService.getBazaraData(this.getDataBody!).subscribe({
        next: (res: ApiResult) => {
          if (res.Result) {
            let obj: ProductDetailStoreAsset[] = res.Data.Objects.ProductDetailStoreAssets;
            
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