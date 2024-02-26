import { Injectable } from '@angular/core';
import { Person } from '../models/Person';
import { Bank } from '../models/Bank';
import { Product } from '../models/product';
import { ProductDetail } from '../models/product-detail';
import { VisitorPerson } from '../models/visitor-person';
import { Order } from '../models/order';
import { OrderDetail } from '../models/order-detail';
import { ProductCategory } from '../models/product-category';
import { PhotoGallery } from '../models/photo-gallery';
import { Picture } from '../models/picture';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {


  private dbName = 'OrderDatabase';
  private dbVersion = 4;
  private loginStoreName = 'loginStore';
  private personStoreName = 'personStore';
  private bankStoreName = 'bankStore';
  private productStoreName = 'productStore';
  private productDetailStoreName = 'productDetailStore';
  private visitorPeopleStoreName = 'visitorPeopleStore';
  private OrderStoreName = 'orderStore';
  private orderDetailStoreName = 'orderDetailStore';
  private productCategoryName = 'productCategoryStore';
  private photoGaleryName = 'photoGalleryStore';
  private pictureName = 'pictureStore';

  private visitorId!: string;

  setVisitorId(visitorId: string): void {
    this.visitorId = visitorId;
    localStorage.setItem('visitorId', visitorId);
  }

  getVisitorId(): string | undefined {
    return localStorage.getItem('visitorId') || undefined;
  }

  constructor() { }

  openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBRequest<IDBDatabase>).result;
        if (!db.objectStoreNames.contains(this.loginStoreName)) {
          db.createObjectStore(this.loginStoreName);
        }
        if (!db.objectStoreNames.contains(this.personStoreName)) {
          db.createObjectStore(this.personStoreName);
        }
        if (!db.objectStoreNames.contains(this.bankStoreName)) {
          db.createObjectStore(this.bankStoreName);
        }
        if (!db.objectStoreNames.contains(this.productStoreName)) {
          db.createObjectStore(this.productStoreName);
        }
        if (!db.objectStoreNames.contains(this.productDetailStoreName)) {
          db.createObjectStore(this.productDetailStoreName);
        }
        if (!db.objectStoreNames.contains(this.visitorPeopleStoreName)) {
          db.createObjectStore(this.visitorPeopleStoreName);
        }
        if (!db.objectStoreNames.contains(this.OrderStoreName)) {
          db.createObjectStore(this.OrderStoreName);
        }
        if (!db.objectStoreNames.contains(this.orderDetailStoreName)) {
          db.createObjectStore(this.orderDetailStoreName);
        }
        if (!db.objectStoreNames.contains(this.productCategoryName)) {
          db.createObjectStore(this.productCategoryName);
        }
        if (!db.objectStoreNames.contains(this.photoGaleryName)) {
          db.createObjectStore(this.photoGaleryName);
        }
        if (!db.objectStoreNames.contains(this.pictureName)) {
          db.createObjectStore(this.pictureName);
        }
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest<IDBDatabase>).result);
      };

      request.onerror = (event) => {
        reject(new Error('Failed to open database: ' + (event.target as any).error.message));
      };
    });
  }

  async storeLoginResponse(response: any): Promise<void> {
    try {
      const db = await this.openDatabase();
      const transaction = db.transaction([this.loginStoreName], 'readwrite');
      const objectStore = transaction.objectStore(this.loginStoreName);


      if (response && response.UserToken) {
        localStorage.setItem('UserToken', response.UserToken);
      }

      // Use a property of the response object as the key
      const key = response.VisitorId;
      this.visitorId = key;

      this.setVisitorId(key)

      const putRequest = objectStore.put(response, key); // Use put instead of add

      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          resolve();
        };

        putRequest.onerror = (event) => {
          reject(new Error('Failed to store data: ' + (event.target as any).error.message));
        };
      });
    } catch (error) {
      console.error('Error storing login response:', error);
      // Handle the error appropriately (e.g., display a user-friendly message)
    }
  }


  async getLoginResponse(): Promise<any> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.loginStoreName], 'readonly');
    const objectStore = transaction.objectStore(this.loginStoreName);

    return new Promise<any>((resolve, reject) => {
      const getRequest = objectStore.get(this.visitorId);
      // Replace 'VisitorId' with the key you used to store the data
      getRequest.onsuccess = (event) => {
        resolve((event.target as IDBRequest<any>).result);
      };

      getRequest.onerror = (event) => {
        reject(new Error('Failed to get data: ' + (event.target as any).error.message));
      };
    });
  }

  async storePeople(people: Person[]): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.personStoreName], 'readwrite');
    const objectStore = transaction.objectStore(this.personStoreName);

    for (const person of people) {
      const key = `${this.getVisitorId()}-${person.PersonId}`; // Use visitorId and PersonId as the key
      const putRequest = objectStore.put(person, key); // Use PersonId as the key

      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          resolve();
        };

        putRequest.onerror = (event) => {
          reject(new Error('Failed to store person data: ' + (event.target as any).error.message));
        };
      });
    }
  }

  async getPeople(): Promise<Person[]> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.personStoreName], 'readonly');
    const objectStore = transaction.objectStore(this.personStoreName);

    // Use a key range to get all people for the specific visitorId
    const keyRange = IDBKeyRange.bound(`${this.getVisitorId()}-`, `${this.getVisitorId()}-\uffff`);

    const getRequest = objectStore.getAll(keyRange);

    return new Promise<Person[]>((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        resolve((event.target as IDBRequest<Person[]>).result);
      };

      getRequest.onerror = (event) => {
        reject(new Error('Failed to get people data: ' + (event.target as any).error.message));
      };
    });
  }


  async storeBanks(banks: Bank[]): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.bankStoreName], 'readwrite');
    const objectStore = transaction.objectStore(this.bankStoreName);

    for (const bank of banks) {
      const key = `${this.getVisitorId()}-${bank.BankId}`; // Use visitorId and BankId as the key
      const putRequest = objectStore.put(bank, key); // Use BankId as the key

      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          resolve();
        };

        putRequest.onerror = (event) => {
          reject(new Error('Failed to store bank data: ' + (event.target as any).error.message));
        };
      });
    }
  }

  async getBanks(): Promise<Bank[]> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.bankStoreName], 'readonly');
    const objectStore = transaction.objectStore(this.bankStoreName);

    // Use a key range to get all banks for the specific visitorId
    const keyRange = IDBKeyRange.bound(`${this.getVisitorId()}-`, `${this.getVisitorId()}-\uffff`);

    const getRequest = objectStore.getAll(keyRange);

    return new Promise<Bank[]>((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        resolve((event.target as IDBRequest<Bank[]>).result);
      };

      getRequest.onerror = (event) => {
        reject(new Error('Failed to get banks data: ' + (event.target as any).error.message));
      };
    });
  }

  // indexed-db.service.ts
  async storeProducts(products: Product[]): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.productStoreName], 'readwrite');
    const objectStore = transaction.objectStore(this.productStoreName);

    for (const product of products) {
      const key = `${this.getVisitorId()}-${product.ProductId}`; // Use visitorId and ProductId as the key
      const putRequest = objectStore.put(product, key); // Use put instead of add

      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          resolve();
        };

        putRequest.onerror = (event) => {
          reject(new Error('Failed to store product data: ' + (event.target as any).error.message));
        };
      });
    }
  }

  async storeProductDetails(productDetails: ProductDetail[]): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.productDetailStoreName], 'readwrite');
    const objectStore = transaction.objectStore(this.productDetailStoreName);

    for (const productDetail of productDetails) {
      const key = `${this.getVisitorId()}-${productDetail.ProductDetailId}`; // Use visitorId and ProductDetailId as the key
      const putRequest = objectStore.put(productDetail, key); // Use put instead of add

      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          resolve();
        };

        putRequest.onerror = (event) => {
          reject(new Error('Failed to store product detail data: ' + (event.target as any).error.message));
        };
      });
    }
  }

  // indexed-db.service.ts
  async getProducts(): Promise<Product[]> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.productStoreName], 'readonly');
    const objectStore = transaction.objectStore(this.productStoreName);

    // Use a key range to get all products for the specific visitorId
    const keyRange = IDBKeyRange.bound(`${this.getVisitorId()}-`, `${this.getVisitorId()}-\uffff`);

    const getRequest = objectStore.getAll(keyRange);

    return new Promise<Product[]>((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        let products = (event.target as IDBRequest<Product[]>).result;
        // Sort products by ProductCode
        products.sort((a, b) => a.ProductCode - b.ProductCode);
        resolve(products);
      };

      getRequest.onerror = (event) => {
        reject(new Error('Failed to get products data: ' + (event.target as any).error.message));
      };
    });
  }


  // indexed-db.service.ts
  async getProductDetails(): Promise<ProductDetail[]> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.productDetailStoreName], 'readonly');
    const objectStore = transaction.objectStore(this.productDetailStoreName);

    // Use a key range to get all product details for the specific visitorId
    const keyRange = IDBKeyRange.bound(`${this.getVisitorId()}-`, `${this.getVisitorId()}-\uffff`);

    const getRequest = objectStore.getAll(keyRange);

    return new Promise<ProductDetail[]>((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        resolve((event.target as IDBRequest<ProductDetail[]>).result);
      };

      getRequest.onerror = (event) => {
        reject(new Error('Failed to get product details data: ' + (event.target as any).error.message));
      };
    });
  }

  // indexed-db.service.ts
  async storeVisitorPeople(visitorPeople: VisitorPerson[]): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.visitorPeopleStoreName], 'readwrite');
    const objectStore = transaction.objectStore(this.visitorPeopleStoreName);

    for (const visitorPerson of visitorPeople) {
      const putRequest = objectStore.put(visitorPerson, visitorPerson.VisitorPersonId); // Use VisitorPersonId as the key

      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          resolve();
        };

        putRequest.onerror = (event) => {
          reject(new Error('Failed to store visitor person data: ' + (event.target as any).error.message));
        };
      });
    }
  }

  async storeOrders(orders: Order[]): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.OrderStoreName], 'readwrite'); // Use your order store name
    const objectStore = transaction.objectStore(this.OrderStoreName);

    for (const order of orders) {
      const key = `${this.getVisitorId()}-${order.OrderId}`; // Use visitorId and OrderId as the key
      const putRequest = objectStore.put(order, key); // Use put instead of add

      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          resolve();
        };

        putRequest.onerror = (event) => {
          reject(new Error('Failed to store order data: ' + (event.target as any).error.message));
        };
      });
    }
  }

  async storeOrderDetails(orderDetails: OrderDetail[]): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.orderDetailStoreName], 'readwrite'); // Use your order detail store name
    const objectStore = transaction.objectStore(this.orderDetailStoreName);

    for (const orderDetail of orderDetails) {
      const key = `${this.getVisitorId()}-${orderDetail.OrderDetailId}`; // Use visitorId and OrderDetailId as the key
      const putRequest = objectStore.put(orderDetail, key); // Use put instead of add

      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          resolve();
        };

        putRequest.onerror = (event) => {
          reject(new Error('Failed to store order detail data: ' + (event.target as any).error.message));
        };
      });
    }
  }

  async getOrderDetails(): Promise<OrderDetail[]> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.orderDetailStoreName], 'readonly'); // Use your order detail store name
    const objectStore = transaction.objectStore(this.orderDetailStoreName);

    // Use a key range to get all order details for the specific visitorId
    const keyRange = IDBKeyRange.bound(`${this.getVisitorId()}-`, `${this.getVisitorId()}-\uffff`);

    const getRequest = objectStore.getAll(keyRange);

    return new Promise<OrderDetail[]>((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        resolve((event.target as IDBRequest<OrderDetail[]>).result);
      };

      getRequest.onerror = (event) => {
        reject(new Error('Failed to get order details data: ' + (event.target as any).error.message));
      };
    });
  }

  async getOrders(): Promise<Order[]> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.OrderStoreName], 'readonly'); // Use your order store name
    const objectStore = transaction.objectStore(this.OrderStoreName);

    // Use a key range to get all orders for the specific visitorId
    const keyRange = IDBKeyRange.bound(`${this.getVisitorId()}-`, `${this.getVisitorId()}-\uffff`);

    const getRequest = objectStore.getAll(keyRange);

    return new Promise<Order[]>((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        resolve((event.target as IDBRequest<Order[]>).result);
      };

      getRequest.onerror = (event) => {
        reject(new Error('Failed to get orders data: ' + (event.target as any).error.message));
      };
    });
  }

  async storeProductCategories(productCategories: ProductCategory[]): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(['productCategoryStore'], 'readwrite'); // Use your product category store name
    const objectStore = transaction.objectStore('productCategoryStore');

    for (const productCategory of productCategories) {
      const key = `${this.getVisitorId()}-${productCategory.ProductCategoryId}`; // Use visitorId and ProductCategoryId as the key
      const putRequest = objectStore.put(productCategory, key); // Use put instead of add

      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          resolve();
        };

        putRequest.onerror = (event) => {
          reject(new Error('Failed to store product category data: ' + (event.target as any).error.message));
        };
      });
    }
  }

  async getProductCategories(): Promise<ProductCategory[]> {
    const db = await this.openDatabase();
    const transaction = db.transaction(['productCategoryStore'], 'readonly'); // Use your product category store name
    const objectStore = transaction.objectStore('productCategoryStore');

    // Use a key range to get all product categories for the specific visitorId
    const keyRange = IDBKeyRange.bound(`${this.getVisitorId()}-`, `${this.getVisitorId()}-\uffff`);

    const getRequest = objectStore.getAll(keyRange);

    return new Promise<ProductCategory[]>((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        resolve((event.target as IDBRequest<ProductCategory[]>).result);
      };

      getRequest.onerror = (event) => {
        reject(new Error('Failed to get product categories data: ' + (event.target as any).error.message));
      };
    });
  }

  async storePhotoGalleries(photoGalleries: PhotoGallery[]): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(['photoGalleryStore'], 'readwrite'); // Use your photo gallery store name
    const objectStore = transaction.objectStore('photoGalleryStore');
  
    for (const photoGallery of photoGalleries) {
      const key = `${this.getVisitorId()}-${photoGallery.PhotoGalleryId}`; // Use visitorId and PhotoGalleryId as the key
      const putRequest = objectStore.put(photoGallery, key); // Use put instead of add
  
      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          resolve();
        };
  
        putRequest.onerror = (event) => {
          reject(new Error('Failed to store photo gallery data: ' + (event.target as any).error.message));
        };
      });
    }
  }

  async getPhotoGalleries(): Promise<PhotoGallery[]> {
    const db = await this.openDatabase();
    const transaction = db.transaction(['photoGalleryStore'], 'readonly'); // Use your photo gallery store name
    const objectStore = transaction.objectStore('photoGalleryStore');
  
    // Use a key range to get all photo galleries for the specific visitorId
    const keyRange = IDBKeyRange.bound(`${this.getVisitorId()}-`, `${this.getVisitorId()}-\uffff`);
  
    const getRequest = objectStore.getAll(keyRange);
  
    return new Promise<PhotoGallery[]>((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        resolve((event.target as IDBRequest<PhotoGallery[]>).result);
      };
  
      getRequest.onerror = (event) => {
        reject(new Error('Failed to get photo galleries data: ' + (event.target as any).error.message));
      };
    });
  }

  async storePictures(pictures: Picture[]): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(['pictureStore'], 'readwrite'); // Use your picture store name
    const objectStore = transaction.objectStore('pictureStore');
  
    for (const picture of pictures) {
      const key = `${this.getVisitorId()}-${picture.PictureId}`; // Use visitorId and PictureId as the key
      const putRequest = objectStore.put(picture, key); // Use put instead of add
  
      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          resolve();
        };
  
        putRequest.onerror = (event) => {
          reject(new Error('Failed to store picture data: ' + (event.target as any).error.message));
        };
      });
    }
  }

  async getPictures(): Promise<Picture[]> {
    const db = await this.openDatabase();
    const transaction = db.transaction(['pictureStore'], 'readonly'); // Use your picture store name
    const objectStore = transaction.objectStore('pictureStore');
  
    // Use a key range to get all pictures for the specific visitorId
    const keyRange = IDBKeyRange.bound(`${this.getVisitorId()}-`, `${this.getVisitorId()}-\uffff`);
  
    const getRequest = objectStore.getAll(keyRange);
  
    return new Promise<Picture[]>((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        resolve((event.target as IDBRequest<Picture[]>).result);
      };
  
      getRequest.onerror = (event) => {
        reject(new Error('Failed to get pictures data: ' + (event.target as any).error.message));
      };
    });
  }

  getToken(): string | null {
    return localStorage.getItem('UserToken');
  }

  // indexed-db.service.ts
  
  async getMaxRowVersion(storeName: string): Promise<number> {
    const db = await this.openDatabase();
    const transaction = db.transaction([storeName], 'readonly');
    const objectStore = transaction.objectStore(storeName);

    // Use a key range to get all records for the specific visitorId
    const keyRange = IDBKeyRange.bound(`${this.getVisitorId()}-`, `${this.getVisitorId()}-\uffff`);

    return new Promise<number>((resolve, reject) => {
      const getRequest = objectStore.getAll(keyRange);
      getRequest.onsuccess = (event) => {
        const records = (event.target as IDBRequest<any[]>).result;
        const maxRowVersion = Math.max(...records.map(record => record.RowVersion), 0);
        resolve(maxRowVersion);
      };

      getRequest.onerror = (event) => {
        reject(new Error('Failed to get records: ' + (event.target as any).error.message));
      };
    });
}


}