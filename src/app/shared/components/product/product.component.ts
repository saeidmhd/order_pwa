import { Component, OnInit } from '@angular/core';

import { IndexedDbService } from '../../../core/services/indexed-db/indexed-db.service';
import { IBazaraProduct } from '../../../core/models/bazara/bazara-DTOs/IBazaraProduct';
import { IBazaraProductDetail } from '../../../core/models/bazara/bazara-DTOs/IBazaraProductDetail';
import { IBazaraVisitorProduct } from '../../../core/models/bazara/bazara-DTOs/IBazaraVisitorProduct';
import { IBazaraPicture } from '../../../core/models/bazara/bazara-DTOs/IBazaraPicture';
import { IBazaraPhotoGallery } from '../../../core/models/bazara/bazara-DTOs/IBazaraPhotoGallery';
import { IBazaraProductDetailStoreAsset } from '../../../core/models/bazara/bazara-DTOs/IBazaraProductDetailAssetStore';

@Component({
  selector: 'app-product',
  standalone: false,
  // imports: [CommonModule, ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  data: any[] = [];
  products: IBazaraProduct[] = [];

  constructor(private genericIndexedService: IndexedDbService) { }

  ngOnInit(): void {
    this.getData().then(() => {
    });
  }

  async getData() {
    // solution2: Promise all to get all data
    this.data.push(this.getProducts());
    this.data.push(this.getProductDetail());
    this.data.push(this.getVisitorProduct());
    this.data.push(this.getProductDetailAssetsStore());
    this.data.push(this.getPhotoGallery());
    this.data.push(this.getPicture());

    Promise.all(this.data).then(val => {
      val[0].forEach((element: IBazaraProduct) => {
        const productDetail = val[1].find((x: IBazaraProductDetail) => x.ProductId == element.ProductId);
        const visitorProduct = val[2].find((x: IBazaraVisitorProduct) => x.ProductDetailId == productDetail.ProductDetailId);
        const photoGallery = val[4].find((pg: IBazaraPhotoGallery) => pg.ItemCode === element.ProductId);
       
        if (!visitorProduct.Deleted) {
          element.price = parseFloat((productDetail as any)['Price' + productDetail?.DefaultSellPriceLevel]);
          element.count1 = val[3].find((x: IBazaraProductDetailStoreAsset) => x.ProductDetailId == productDetail.ProductDetailId).Count1;
          element.count2 = val[3].find((x: IBazaraProductDetailStoreAsset) => x.ProductDetailId == productDetail.ProductDetailId).Count2;

          if (photoGallery != undefined) {
            const picture = val[5].find((x: IBazaraPicture) => x.PictureId === photoGallery?.PictureId);
            
            if (picture)
              element.picUrl = `https://mahakacc.mahaksoft.com${picture.Url}`;
          }
          else {
            element.picUrl = 'assets/img_empty_product.png';
          }

          this.products.push(element);
        }
      });
    });
  }

  async getProducts(): Promise<IBazaraProduct[]> {
    return new Promise((resolve, reject) => {
      this.genericIndexedService.getAllData<IBazaraProduct>('Product').then((products) => {
        resolve(products);
      });
    });
  }

  async getProductDetail(): Promise<IBazaraProductDetail[]> {
    return new Promise((resolve, reject) => {
      this.genericIndexedService.getAllData<IBazaraProductDetail>('ProductDetail').then(productDetails => {
        resolve(productDetails);
      });
    });
  }

  async getVisitorProduct(): Promise<IBazaraVisitorProduct[]> {
    return new Promise((resolve, reject) => {
      this.genericIndexedService.getAllData<IBazaraVisitorProduct>('VisitorProduct').then(visitorProducts => {
        resolve(visitorProducts);
      });
    });
  }

  async getProductDetailAssetsStore(): Promise<IBazaraProductDetailStoreAsset[]> {
    return new Promise((resolve, reject) => {
      this.genericIndexedService.getAllData<IBazaraProductDetailStoreAsset>('ProductDetailStoreAsset').then(productDetailAssetStore => {
        resolve(productDetailAssetStore);
      });
    });
  }

  async getPicture(): Promise<IBazaraPicture[]> {
    return new Promise((Resolve, reject) => {
      this.genericIndexedService.getAllData<IBazaraPicture>('Picture').then(pictures => {
        Resolve(pictures);
      })
    });
  }

  async getPhotoGallery(): Promise<IBazaraPhotoGallery[]> {
    return new Promise((resolve, reject) => {
      this.genericIndexedService.getAllData<IBazaraPhotoGallery>('PhotoGallery').then(photoGalleries => {
        resolve(photoGalleries);
      })
    })
  }
}