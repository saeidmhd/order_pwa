import { Injectable } from '@angular/core';
import { StoreName } from '../../models/indexeddb/storeName';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbManagementService {

  db: any;
  private dbName = 'MobileOrderingDb';
  private dbVersion = 7;

  constructor() {
    this.openDatabase();
  }

  async openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        this.db = (event.target as IDBRequest<IDBDatabase>).result;
        if (!this.db.objectStoreNames.contains('Login')) {
          this.db.createObjectStore(StoreName.Login);
        }
        if (!this.db.objectStoreNames.contains('Bank')) {
          this.db.createObjectStore(StoreName.Bank);
        }
        if (!this.db.objectStoreNames.contains('Product')) {
          this.db.createObjectStore(StoreName.Product);
        }
        if (!this.db.objectStoreNames.contains('ProductCategory')) {
          this.db.createObjectStore(StoreName.ProductCategory);
        }
        if (!this.db.objectStoreNames.contains('ProductDetail')) {
          this.db.createObjectStore(StoreName.ProductDetail);
        }
        if (!this.db.objectStoreNames.contains('VisitorProduct')) {
          this.db.createObjectStore(StoreName.VisitorProduct);
        }
        if (!this.db.objectStoreNames.contains('VisitorPerson')) {
          this.db.createObjectStore(StoreName.VisitorPerson);
        }
        if (!this.db.objectStoreNames.contains('Cash')) {
          this.db.createObjectStore(StoreName.Cash);
        }
        if (!this.db.objectStoreNames.contains('CheckList')) {
          this.db.createObjectStore(StoreName.CheckList);
        }
        if (!this.db.objectStoreNames.contains('Cheque')) {
          this.db.createObjectStore(StoreName.Cheque);
        }
        if (!this.db.objectStoreNames.contains('CompanyInfo')) {
          this.db.createObjectStore(StoreName.CompanyInfo);
        }
        if (!this.db.objectStoreNames.contains('CostLevelName')) {
          this.db.createObjectStore(StoreName.CostLevelName);
        }
        if (!this.db.objectStoreNames.contains('ExtraData')) {
          this.db.createObjectStore(StoreName.ExtraData);
        }
        if (!this.db.objectStoreNames.contains('Income')) {
          this.db.createObjectStore(StoreName.Income);
        }
        if (!this.db.objectStoreNames.contains('IncomeGroup')) {
          this.db.createObjectStore(StoreName.IncomeGroup);
        }
        if (!this.db.objectStoreNames.contains('Mission')) {
          this.db.createObjectStore(StoreName.Mission);
        }
        if (!this.db.objectStoreNames.contains('MissionDetail')) {
          this.db.createObjectStore(StoreName.MissionDetail);
        }
        if (!this.db.objectStoreNames.contains('Order')) {
          const orderStore = this.db.createObjectStore(StoreName.Order);
          
          orderStore.createIndex('by-client-id', 'OrderClientId');
        }
        if (!this.db.objectStoreNames.contains('OrderDetail')) {
          this.db.createObjectStore(StoreName.OrderDetail);
        }
        if (!this.db.objectStoreNames.contains('Person')) {
          this.db.createObjectStore(StoreName.Person);
        }
        if (!this.db.objectStoreNames.contains('PersonAddress')) {
          this.db.createObjectStore(StoreName.PersonAddress);
        }
        if (!this.db.objectStoreNames.contains('Picture')) {
          this.db.createObjectStore(StoreName.Picture);
        }
        if (!this.db.objectStoreNames.contains('PhotoGallery')) {
          this.db.createObjectStore(StoreName.PhotoGallery);
        }
        if (!this.db.objectStoreNames.contains('ProductDetailAssetStore')) {
          this.db.createObjectStore(StoreName.ProductDetailStoreAsset);
        }
        if (!this.db.objectStoreNames.contains('PropertyDescription')) {
          this.db.createObjectStore(StoreName.PropertyDescription);
        }
        if (!this.db.objectStoreNames.contains('Setting')) {
          this.db.createObjectStore(StoreName.Setting);
        }
        if (!this.db.objectStoreNames.contains('ExtraData')) {
          this.db.createObjectStore('ExtraData');
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

  async waitForDb() {
    if (!this.db)
      this.db = await this.openDatabase();
  }
}