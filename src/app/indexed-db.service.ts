import { Injectable } from '@angular/core';
import { Person } from './Person';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  

  private dbName = 'loginDatabase';
  private loginStoreName = 'loginResponse';
  private personStoreName = 'personStore';
  private visitorId!: string; 

  constructor() {}

  openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBRequest<IDBDatabase>).result;
        if (!db.objectStoreNames.contains(this.loginStoreName)) {
          db.createObjectStore(this.loginStoreName);
        }
        if (!db.objectStoreNames.contains(this.personStoreName)) {
          db.createObjectStore(this.personStoreName);
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
  
      // Use a property of the response object as the key
      const key = response.VisitorId;
      this.visitorId = key;
  
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
    const transaction = db.transaction([this.loginStoreName], 'readonly');
    const objectStore = transaction.objectStore(this.loginStoreName);

    return new Promise<any>((resolve, reject) => {
      const getRequest = objectStore.get(this.visitorId);
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

  async storePeople(people: Person[]): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction([this.personStoreName], 'readwrite');
    const objectStore = transaction.objectStore(this.personStoreName);

    for (const person of people) {
      const putRequest = objectStore.put(person, person.PersonId); // Use PersonId as the key

      await new Promise<void>((resolve, reject) => {
        putRequest.onsuccess = (event) => {
          console.log('Person data stored in IndexedDB with key: ' + (event.target as any).result);
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

    return new Promise<Person[]>((resolve, reject) => {
      const getRequest = objectStore.getAll();

      getRequest.onsuccess = (event) => {
        resolve((event.target as IDBRequest<Person[]>).result);
      };

      getRequest.onerror = (event) => {
        reject(new Error('Failed to get people data: ' + (event.target as any).error.message));
      };
    });
  }

  async getLoginToken(): Promise<string> {
    console.log("getLoginToken")
    const db = await this.openDatabase();
    const transaction = db.transaction([this.loginStoreName], 'readonly');
    const objectStore = transaction.objectStore(this.loginStoreName);
  
    return new Promise<string>((resolve, reject) => {
      const getRequest = objectStore.get(this.visitorId);// Use visitorId to fetch the token

      console.log("this.visitorId" + this.visitorId)
  
      getRequest.onsuccess = (event) => {
        const loginResponse = (event.target as IDBRequest<any>).result;

        console.log(loginResponse)

        if (loginResponse && loginResponse.UserToken) {
          resolve(loginResponse.UserToken);
        } else {
          reject(new Error('No login response or Data is undefined'));
        }
      };
  
      getRequest.onerror = (event) => {
        reject(new Error('Failed to get token: ' + (event.target as any).error.message));
      };
    });
  }
  
}