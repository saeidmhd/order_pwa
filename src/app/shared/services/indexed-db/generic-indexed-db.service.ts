import { Injectable } from '@angular/core';
import { GeneratingIndexedDbService } from './generating-indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class GenericIndexedDbService {

  private visitorId!: string;

  constructor(private generatingIndexedDb: GeneratingIndexedDbService) { }

  getVisitorId(): number {
    return +localStorage.getItem('VisitorId')!;
  }

  setVisitorId(visitorId: string): void {
    this.visitorId = visitorId;
    localStorage.setItem('VisitorId', visitorId);
  }

  async getAllData<T>(storeName: string): Promise<T[]> {
    await this.generatingIndexedDb.waitForDb();
    const transaction = this.generatingIndexedDb.db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);

    // // Use a key range to get all storeData for the specific visitorId
    // const keyRange = IDBKeyRange.bound(`${this.getVisitorId()}-`, `${this.getVisitorId()}-\uffff`);
    const keyRange = IDBKeyRange.bound([this.getVisitorId(), 0], [this.getVisitorId(), 2147483647]);
    
    return new Promise<T[]>((resolve, reject) => {
      const getRequest = objectStore.getAll(keyRange);
      getRequest.onsuccess = (event: any) => {
        let obj: T[] = (event.target as IDBRequest<T[]>).result;
        // obj.sort((a,b) => a.PersonCode - b.PersonCode)
        resolve(obj);
      };

      getRequest.onerror = (event: any) => {
        reject(new Error('Failed to get data: ' + (event.target as any).error.message));
      };
    });
  }

  async addOrEdit<T>(storeName: string, data: T): Promise<T> {
    try {
      await this.generatingIndexedDb.waitForDb();

      const db = await this.generatingIndexedDb.openDatabase();
      const transaction = db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      
      if (storeName === 'Login') {
        const putRequest = objectStore.put(data, this.getVisitorId());
      }
      else {
        const putRequest = objectStore.put(data);  
      }
      //  some action may be needed later

      // await new Promise<void>((resolve, reject) => {
      //   putRequest.onsuccess = (event: any) => {
      //     resolve();
      //   };

      //   putRequest.onerror = (event: any) => {
      //     reject(new Error('Failed to store person data: ' + (event.target as any).error.message));
      //   };
      // });
    }
    catch (error) {
      console.log(error);
    }
    
    return data;
  }

  async insertingToDb<T>(storeName: string, data: T[]) {
    data.forEach(async (element: T) => {
      await this.addOrEdit(storeName, element);
    });
  }

  async delete<T>(storeName: string, data: T) {
    // data.Delete = true;
    await this.generatingIndexedDb.waitForDb();
    await this.generatingIndexedDb.db.put(storeName, data);
    //  some action may be needed later
  }

  async getMaxRowVersion(storeName: string): Promise<number> {
    const db = await this.generatingIndexedDb.openDatabase();
    const transaction = db.transaction([storeName], 'readonly');
    const objectStore = transaction.objectStore(storeName);

    // Use a key range to get all records for the specific visitorId
    // const keyRange = IDBKeyRange.bound(`${this.getVisitorId()}-`, `${this.getVisitorId()}-\uffff`);
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
}