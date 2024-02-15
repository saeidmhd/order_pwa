import { Injectable } from '@angular/core';
import { Person } from '../models/Person';
import { Bank } from '../models/Bank';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  
  
  private dbName = 'OrderDatabase';
  private loginStoreName = 'loginStore';
  private personStoreName = 'personStore';
  private bankStoreName = 'bankStore';
  private visitorId!: string; 

  setVisitorId(visitorId: string): void {
    this.visitorId = visitorId;
    localStorage.setItem('visitorId', visitorId);
  }

  getVisitorId(): string | undefined {
    return localStorage.getItem('visitorId') || undefined;
  }

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
        if (!db.objectStoreNames.contains(this.bankStoreName)) {
          db.createObjectStore(this.bankStoreName);
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

      this.setVisitorId(key)

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
          console.log('Bank data stored in IndexedDB with key: ' + (event.target as any).result);
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

  async getLoginToken(): Promise<string> {
    console.log("getLoginToken")
    const db = await this.openDatabase();
    const transaction = db.transaction([this.loginStoreName], 'readonly');
    const objectStore = transaction.objectStore(this.loginStoreName);
  
    return new Promise<string>((resolve, reject) => {
      const getRequest = objectStore.get(this.visitorId);// Use visitorId to fetch the token
  
      getRequest.onsuccess = (event) => {
        const loginResponse = (event.target as IDBRequest<any>).result;

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