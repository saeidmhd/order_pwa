import { Injectable } from '@angular/core';
import { STORE_NAMES } from '../../constants/store-names'; // Adjust the import path as necessary


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

  async openDatabase(storeName?: string): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        this.db = (event.target as IDBRequest<IDBDatabase>).result;
        STORE_NAMES.forEach(store => {
          if (!this.db.objectStoreNames.contains(store)) {
            this.db.createObjectStore(store);
          }
        });

        if (storeName && !this.db.objectStoreNames.contains(storeName)) {
          this.db.createObjectStore(storeName);
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBRequest<IDBDatabase>).result;
        resolve(this.db);
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
