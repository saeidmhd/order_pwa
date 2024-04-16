import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratingIndexedDbService {

  db: any;
  private dbName = 'MobileOrderingDb';
  private dbVersion = 10;

  constructor() {
    this.openDatabase().then(
      // console.log('salam')

    );
  }

  async openDatabase(): Promise<IDBDatabase> {
    // const vistorId: string = localStorage.getItem('VisitorId')!.toString();
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        this.db = (event.target as IDBRequest<IDBDatabase>).result;
        if (!this.db.objectStoreNames.contains('Login')) {
          this.db.createObjectStore('Login');
        }
        if (!this.db.objectStoreNames.contains('Bank')) {
          this.db.createObjectStore('Bank', {
            keyPath: ['VisitorId', 'BanklId']
          });
        }
        if (!this.db.objectStoreNames.contains('Product')) {
          this.db.createObjectStore('Product', {
            keyPath: ['VisitorId', 'ProductId']
          });
        }
        if (!this.db.objectStoreNames.contains('ProductDetail')) {
          this.db.createObjectStore('ProductDetail', {
            keyPath: ['VisitorId', 'ProductDetailId']
          });
        }
        if (!this.db.objectStoreNames.contains('VisitorProduct')) {
          this.db.createObjectStore('VisitorProduct', {
            keyPath: ['VisitorId', 'VisitorProductId']
          });
        }
        if (!this.db.objectStoreNames.contains('VisitorPerson')) {
          this.db.createObjectStore('VisitorPerson', {
            keyPath: ['VisitorId', 'VisitorPersonId']
          });
        }
        if (!this.db.objectStoreNames.contains('Cash')) {
          this.db.createObjectStore('Cash', {
            keyPath: ['VisitorId', 'CashId']
          });
        }
        if (!this.db.objectStoreNames.contains('CheckList')) {
          this.db.createObjectStore('CheckList', {
            keyPath: ['VisitorId', 'CheckListId']
          });
        }
        if (!this.db.objectStoreNames.contains('Cheque')) {
          this.db.createObjectStore('Cheque', {
            keyPath: ['VisitorId', 'ChequeId']
          });
        }
        if (!this.db.objectStoreNames.contains('CompanyInfo')) {
          this.db.createObjectStore('CompanyInfo', {
            keyPath: ['VisitorId', 'CompanyInfoId']
          });
        }
        if (!this.db.objectStoreNames.contains('CostLevelName')) {
          this.db.createObjectStore('CostLevelName', {
            keyPath: ['VisitorId', 'CostLevelNameId']
          });
        }
        if (!this.db.objectStoreNames.contains('ExtraData')) {
          this.db.createObjectStore('ExtraData', {
            keyPath: ['VisitorId', 'ExtraDataId']
          });
        }
        if (!this.db.objectStoreNames.contains('Income')) {
          this.db.createObjectStore('Income', {
            keyPath: ['VisitorId', 'IncomeId']
          });
        }
        if (!this.db.objectStoreNames.contains('IncomeGroup')) {
          this.db.createObjectStore('IncomeGroup', {
            keyPath: ['VisitorId', 'IncomeGroupId']
          });
        }
        if (!this.db.objectStoreNames.contains('Mission')) {
          this.db.createObjectStore('Mission', {
            keyPath: ['VisitorId', 'MissionId']
          });
        }
        if (!this.db.objectStoreNames.contains('MissionDetail')) {
          this.db.createObjectStore('MissionDetail', {
            keyPath: ['VisitorId', 'MissionDetailId']
          });
        }
        if (!this.db.objectStoreNames.contains('Order')) {
          this.db.createObjectStore('Order', {
            keyPath: ['VisitorId', 'OrderId']
          });
        }
        if (!this.db.objectStoreNames.contains('OrderDetail')) {
          this.db.createObjectStore('OrderDetail', {
            keyPath: ['VisitorId', 'OrderDetailId']
          });
        }
        if (!this.db.objectStoreNames.contains('Person')) {
          this.db.createObjectStore('Person', {
            keyPath: ['VisitorId', 'PersonId']
          });
        }
        if (!this.db.objectStoreNames.contains('PersonAddress')) {
          this.db.createObjectStore('PersonAddress', {
            keyPath: ['VisitorId', 'PersonAddressId']
          });
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