import { Injectable } from '@angular/core';
import { IndexedDbManagementService } from './indexedb-management.service';
import { Person } from '../../models/old/Person';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  personStoreName: any;

  constructor(private indexedDbManagementService: IndexedDbManagementService) { }

  getVisitorId(): number {
    return +localStorage.getItem('VisitorId')!;
  }

  setVisitorId(visitorId: string): void {
    localStorage.setItem('VisitorId', visitorId);
  }

  async getAllData<T>(storeName: string): Promise<T[]> {
    await this.indexedDbManagementService.waitForDb();
    const transaction = this.indexedDbManagementService.db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);

    const max_int = Number.MAX_SAFE_INTEGER;
    const keyRange = IDBKeyRange.bound([this.getVisitorId(), 0], [this.getVisitorId(), max_int]);

    return new Promise<T[]>((resolve, reject) => {
      const getRequest = objectStore.getAll(keyRange);
      getRequest.onsuccess = (event: any) => {
        let obj: T[] = (event.target as IDBRequest<T[]>).result;
        resolve(obj);
      };

      getRequest.onerror = (event: any) => {
        reject(new Error('Failed to get data: ' + (event.target as any).error.message));
      };
    });
  }

  async getByIndex<T>(storeName: string, indexName: string, searchData: string | number): Promise<T> {
    await this.indexedDbManagementService.waitForDb();
    const transaction = this.indexedDbManagementService.db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const index = objectStore.index(indexName);

    return new Promise((resolve, reject) => {
      const request = index.openCursor(IDBKeyRange.only(searchData));
      request.onsuccess = function () {
        const cursor = request.result;
        if (cursor) {
          resolve(cursor.value);
          cursor.continue();
        } else {
        }
      };
    });
  }

  async addOrEdit<T>(storeName: string, data: T, key: IDBValidKey): Promise<T> {
    try {
      await this.indexedDbManagementService.waitForDb();

      const db = await this.indexedDbManagementService.openDatabase(storeName);
      const transaction = db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);

      const putRequest = objectStore.put(data, key);
      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          resolve();
        };

        putRequest.onerror = (event) => {
          reject(new Error('Failed to store data: ' + (event.target as any).error.message));
        };
      });
    }
    catch (error) {
      console.log(error);
    }

    return data;
  }

  async insertingToDb<T>(storeName: string, data: T[], key: IDBValidKey) {
    data.forEach(async (element: T) => {
      await this.addOrEdit(storeName, element, key);
    });
  }

  async delete<T>(storeName: string, data: T) {
    await this.indexedDbManagementService.waitForDb();
    await this.indexedDbManagementService.db.put(storeName, data);
  }

  async getMaxRowVersion(storeName: string): Promise<number> {
    const db = await this.indexedDbManagementService.openDatabase(storeName);
    const transaction = db.transaction([storeName], 'readonly');
    const objectStore = transaction.objectStore(storeName);

    const keyRange = IDBKeyRange.bound([this.getVisitorId(), 0], [this.getVisitorId(), 2147483647]);

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

  async getPersonById(personId: number): Promise<Person> {
    await this.indexedDbManagementService.waitForDb();
    const transaction = this.indexedDbManagementService.db.transaction("Person", 'readonly');
    const objectStore = transaction.objectStore("Person");

    return new Promise<Person>((resolve, reject) => {
      const getRequest = objectStore.get(personId);
      getRequest.onsuccess = (event: any) => {
        let person: Person = (event.target as IDBRequest<Person>).result;
        resolve(person);
      };

      getRequest.onerror = (event: any) => {
        reject(new Error('Failed to get person: ' + (event.target as any).error.message));
      };
    });
  }
}
