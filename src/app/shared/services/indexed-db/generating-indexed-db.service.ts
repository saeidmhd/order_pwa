import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratingIndexedDbService {

  db: any;
  private dbName = 'MobileOrderingDb';
  private dbVersion = 1;

  constructor() {
    this.openDatabase().then(
      // console.log('salam')
      
    );
   }

  async openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        this.db = (event.target as IDBRequest<IDBDatabase>).result;
        if (!this.db.objectStoreNames.contains('Login')) {
          this.db.createObjectStore('Login');
        }
        if (!this.db.objectStoreNames.contains('Bank')) {
          this.db.createObjectStore('Bank');
        }
        if (!this.db.objectStoreNames.contains('Cash')) {
          this.db.createObjectStore('Cash');
        }
        if (!this.db.objectStoreNames.contains('CheckList')) {
          this.db.createObjectStore('CheckList');
        }
        if (!this.db.objectStoreNames.contains('Cheque')) {
          this.db.createObjectStore('Cheque');
        }
        if (!this.db.objectStoreNames.contains('CompanyInfo')) {
          this.db.createObjectStore('CompanyInfo');
        }
        if (!this.db.objectStoreNames.contains('CostLevelName')) {
          this.db.createObjectStore('CostLevelName');
        }
        if (!this.db.objectStoreNames.contains('ExtraData')) {
          this.db.createObjectStore('ExtraData');
        }
        if (!this.db.objectStoreNames.contains('Income')) {
          this.db.createObjectStore('Income');
        }
        if (!this.db.objectStoreNames.contains('IncomeGroup')) {
          this.db.createObjectStore('IncomeGroup');
        }
        if (!this.db.objectStoreNames.contains('Mission')) {
          this.db.createObjectStore('Mission');
        }
        if (!this.db.objectStoreNames.contains('MissionDetail')) {
          this.db.createObjectStore('MissionDetail');
        }
        if (!this.db.objectStoreNames.contains('Order')) {
          this.db.createObjectStore('Order');
        }
        if (!this.db.objectStoreNames.contains('OrderDetail')) {
          this.db.createObjectStore('OrderDetail');
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