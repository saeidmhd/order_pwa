import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ObservableInput, forkJoin, from } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { GenericIndexedDbService } from '../../services/indexed-db/generic-indexed-db.service';
import { IBazaraProduct } from '../../models/bazara-models/bazara-DTOs/IBazaraProduct';
import { IBazaraProductDetail } from '../../models/bazara-models/bazara-DTOs/IBazaraProductDetail';
import { IBazaraVisitorProduct } from '../../models/bazara-models/bazara-DTOs/IBazaraVisitorProduct';
import { IBazaraPicture } from '../../models/bazara-models/bazara-DTOs/IBazaraPicture';
import { IBazaraPhotoGallery } from '../../models/bazara-models/bazara-DTOs/IBazaraPhotoGallery';
import { IBazaraProductDetailStoreAsset } from '../../models/bazara-models/bazara-DTOs/IBazaraProductDetailAssetStore';

@Component({
  selector: 'app-product',
  standalone: false,
  // imports: [CommonModule, ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  data: any[] = [];
  // data: [IBazaraProduct[], IBazaraProductDetail[],
  //        IBazaraVisitorProduct[], IBazaraProductDetailAssetStore[],
  //        IBazaraPhotoGallery[], IBazaraPicture[] ] = [[],[],[],[],[],[]];
  products: IBazaraProduct[] = [];

  constructor(private genericIndexedService: GenericIndexedDbService) { }

  ngOnInit(): void {
    this.getData().then(() => {
    });
  }

  async getData() {
    // solution1: get data and make them observable
    // await this.getProducts();
    // await this.getProductDetail();
    // await this.getVisitorProduct();
    // return new Promise((resolve) => {
    //   resolve();
    // });

    /// end of solution1

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

        // console.log(photoGallery);
        // console.log(picture);


        if (!visitorProduct.Deleted) {
          element.price = productDetail.Price1;
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
          console.log(element.picUrl);

          this.products.push(element);


        }
      });
    });
  }

  // solution 2

  setData() { }
  // end of solution 2

  //// solution 1
  async getProducts(): Promise<IBazaraProduct[]> {
    return new Promise((resolve, reject) => {
      this.genericIndexedService.getAllData<IBazaraProduct>('Product').then((products) => {
        // console.log(products);
        // this.productsSubject$.next(products) // solution1
        resolve(products);
      });
    });
  }

  async getProductDetail(): Promise<IBazaraProductDetail[]> {
    return new Promise((resolve, reject) => {
      this.genericIndexedService.getAllData<IBazaraProductDetail>('ProductDetail').then(productDetails => {
        // console.log(productDetails, 'Product details');
        // this.productDetailsSubject.next(productDetails); // solution1
        resolve(productDetails);
      });
    });
  }

  async getVisitorProduct(): Promise<IBazaraVisitorProduct[]> {
    return new Promise((resolve, reject) => {
      this.genericIndexedService.getAllData<IBazaraVisitorProduct>('VisitorProduct').then(visitorProducts => {
        // console.log(visitorProducts, 'Product details');
        // this.visitorProductSubject.next(visitorProducts); //solution 1

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
  /// end of solution 1
}




// solution 1

// private productsSubject$: BehaviorSubject<IBazaraProduct[]> = new BehaviorSubject<IBazaraProduct[]>([]);
// get products$(): Observable<IBazaraProduct[]> {
//   return this.productsSubject$.asObservable();
// }

// private productDetailsSubject: BehaviorSubject<IBazaraProductDetail[]> = new BehaviorSubject<IBazaraProductDetail[]>([]);
// get productDetails$(): Observable<IBazaraProductDetail[]> {
//   return this.productDetailsSubject.asObservable();
// }

// private visitorProductSubject: BehaviorSubject<IBazaraVisitorProduct[]> = new BehaviorSubject<IBazaraVisitorProduct[]>([]);
// get visitorProducts$(): Observable<IBazaraVisitorProduct[]> {
//   return this.visitorProductSubject.asObservable();
// }


// setProductName() {
//   this.productDetails$.pipe(
//     switchMap(pds => from(pds)),
//     mergeMap((pd) =>
//       this.products$.pipe(map((p) => {
//         pd.ProductName = p.find(x => x.ProductId === pd.ProductId)?.Name!;
//       }))
//     )
//   ).subscribe();
// }

// setProductCount() {

//   // this.visitorProducts$.subscribe(res => console.log(res))
//   this.productDetails$.pipe(
//     switchMap(pds => from(pds)),
//     mergeMap((pd) =>
//       this.visitorProducts$.pipe(map((vp) => {
//         console.log(vp, 'set product count');

//         pd.Count1 = vp.find(x => x.ProductDetailId === pd.ProductDetailId && !x.Deleted)?.Count1!;
//         pd.Count2 = vp.find(x => x.ProductDetailId === pd.ProductDetailId && !x.Deleted)?.Count2!;
//       }))
//     ),
//   ).subscribe();
// }


// solution 3
// setProductCount() {
//   forkJoin({
//     pd: this.productDetails$,
//     p: this.products$,
//     vp: this.visitorProducts$
//   }).subscribe(res => {
//     res.p.find
//   })
// }