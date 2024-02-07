import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbName = 'loginDatabase';
  private objectStoreName = 'loginResponse';

  constructor() {}

  openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBRequest<IDBDatabase>).result;
        if (!db.objectStoreNames.contains(this.objectStoreName)) {
          db.createObjectStore(this.objectStoreName);
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
      const transaction = db.transaction([this.objectStoreName], 'readwrite');
      const objectStore = transaction.objectStore(this.objectStoreName);
  
      // Use a property of the response object as the key
      const key = response.VisitorId;
  
      const putRequest = objectStore.put(response, key); // Use put instead of add
  
      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          console.log('Data stored in IndexedDB with key: ' + (event.target as any).result);
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
    const transaction = db.transaction([this.objectStoreName], 'readonly');
    const objectStore = transaction.objectStore(this.objectStoreName);

    return new Promise<any>((resolve, reject) => {
      const getRequest = objectStore.get(26575);
       // Replace 'VisitorId' with the key you used to store the data
       console.log(getRequest);

      getRequest.onsuccess = (event) => {
        resolve((event.target as IDBRequest<any>).result);
      };

      getRequest.onerror = (event) => {
        reject(new Error('Failed to get data: ' + (event.target as any).error.message));
      };
    });
  }
  
  
}