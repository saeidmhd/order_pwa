import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbName = 'myDatabase';
  private objectStoreName = 'loginResponse';

  constructor() { }

  openDatabase(): IDBRequest {
    return indexedDB.open(this.dbName, 1);
  }

  async storeLoginResponse(response: any): Promise<void> {
    const request: IDBRequest<IDBDatabase> = this.openDatabase();
  
    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest<IDBDatabase>).result;
  
      if (db) {
        const transaction = db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);
  
        // Add the response to the object store
        const addRequest = objectStore.add(response);
  
        addRequest.onsuccess = (addEvent) => {
          console.log('Data stored in IndexedDB with key: ' + (addEvent.target as any).result);
        };
  
        addRequest.onerror = (addEvent) => {
          console.error('Failed to store data: ' + (addEvent.target as any).error.message);
        };
        // Rest of your code for working with the transaction
      } else {
        console.error('Failed to open the database');
      }
    };
  
    request.onerror = (event) => {
      console.error('Failed to open the database: ' + (event.target as any).error.message);
    };
  }
  
  

  // Add other methods for retrieving and managing data in IndexedDB if needed
}
