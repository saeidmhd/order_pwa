import { Component, OnInit } from '@angular/core';

import { IndexedDbService } from '../../../core/services/indexed-db/indexed-db.service';
import { Product } from '../../../core/models/bazara/bazara-DTOs/product';
import { ProductDetail } from '../../../core/models/bazara/bazara-DTOs/productDetail';
import { IBazaraVisitorProduct } from '../../../core/models/bazara/bazara-DTOs/IBazaraVisitorProduct';
import { Picture } from '../../../core/models/bazara/bazara-DTOs/picture';
import { PhotoGallery } from '../../../core/models/bazara/bazara-DTOs/PhotoGallery';
import { ProductDetailStoreAsset } from '../../../core/models/bazara/bazara-DTOs/productDetailAssetStore';

@Component({
  selector: 'app-product',
  standalone: false,
  // imports: [CommonModule, ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  data: any[] = [];
  products: Product[] = [];

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
      val[0].forEach((element: Product) => {
        const productDetail = val[1].find((x: ProductDetail) => x.ProductId == element.ProductId);
        const visitorProduct = val[2].find((x: IBazaraVisitorProduct) => x.ProductDetailId == productDetail.ProductDetailId);
        const photoGallery = val[4].find((pg: PhotoGallery) => pg.ItemCode === element.ProductId);
       
        if (!visitorProduct.Deleted) {
          element.price = parseFloat((productDetail as any)['Price' + productDetail?.DefaultSellPriceLevel]);
          element.count1 = val[3].find((x: ProductDetailStoreAsset) => x.ProductDetailId == productDetail.ProductDetailId).Count1;
          element.count2 = val[3].find((x: ProductDetailStoreAsset) => x.ProductDetailId == productDetail.ProductDetailId).Count2;

          if (photoGallery != undefined) {
            const picture = val[5].find((x: Picture) => x.PictureId === photoGallery?.PictureId);
            
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

  async getProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.genericIndexedService.getAllData<Product>('Product').then((products) => {
        resolve(products);
      });
    });
  }

  async getProductDetail(): Promise<ProductDetail[]> {
    return new Promise((resolve, reject) => {
      this.genericIndexedService.getAllData<ProductDetail>('ProductDetail').then(productDetails => {
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

  async getProductDetailAssetsStore(): Promise<ProductDetailStoreAsset[]> {
    return new Promise((resolve, reject) => {
      this.genericIndexedService.getAllData<ProductDetailStoreAsset>('ProductDetailStoreAsset').then(productDetailAssetStore => {
        resolve(productDetailAssetStore);
      });
    });
  }

  async getPicture(): Promise<Picture[]> {
    return new Promise((Resolve, reject) => {
      this.genericIndexedService.getAllData<Picture>('Picture').then(pictures => {
        Resolve(pictures);
      })
    });
  }

  async getPhotoGallery(): Promise<PhotoGallery[]> {
    return new Promise((resolve, reject) => {
      this.genericIndexedService.getAllData<PhotoGallery>('PhotoGallery').then(photoGalleries => {
        resolve(photoGalleries);
      })
    })
  }
}