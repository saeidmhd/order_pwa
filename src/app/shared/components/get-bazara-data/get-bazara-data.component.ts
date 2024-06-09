import { Component, OnInit } from '@angular/core';
import { IndexedDbService } from '../../../core/services/indexed-db/indexed-db.service';
import { IGetBazaraData } from '../../../core/models/bazara/get-all-data-DTOs/IGetBazaraData';
import { BazaraService } from '../../../core/services/bazara/bazara.service';
import { IApiResult } from '../../../core/models/bazara/get-all-data-DTOs/IApiResult';
import { ReceivedBazaraData } from 'src/app/core/models/bazara/get-all-data-DTOs/ReceviedBazaraData';

@Component({
  selector: 'app-get-bazara-data',
  standalone: true,
  imports: [],
  templateUrl: './get-bazara-data.component.html',
  styleUrls: ['./get-bazara-data.component.css']
})
export class GetBazaraDataComponent implements OnInit {

  terminate: boolean = false;
  dataStatus: { [key: string]: boolean } = {};
  dataCounts: { [key: string]: number } = {};
  maxRowVersionModel: IGetBazaraData = {};
  visitorId = localStorage.getItem('VisitorId')!;

  constructor(private indexedDbService: IndexedDbService, private bazaraService: BazaraService) { }

  ngOnInit(): void {
    this.fetchAllData();
  }

  private async fetchAllData() {
    try {
      const stores = [
        'Person',
        'VisitorPerson',
        'ProductCategory',
        'PersonAddress',
        'Product',
        'VisitorProduct',
        'ProductDetail',
        'PhotoGallery',
        'Picture',
        'ProductDetailStoreAsset',
        'Bank',
        'Mission',
        'MissionDetail',
        'Order',
        'OrderDetail',
        'PropertyDescription',
        'Setting',
        'ExtraData'
      ];

      // Get max row versions for all required data stores
      for (const store of stores) {
        const property = `from${store}Version` as keyof IGetBazaraData;
        this.maxRowVersionModel[property] = await this.indexedDbService.getMaxRowVersion(store);
      }

      // Fetch all data
      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {
          if (res.Result) {
            this.handleReceivedData(res.Data.Objects);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.terminate = true;
    }
  }

  private handleReceivedData(dataObjects: any) {
    const dataMapping = {
      People: ['Person', 'peopleReceived'],
      VisitorPeople: ['VisitorPerson', 'visitorPeopleReceived'],
      ProductCategories: ['ProductCategory', 'productCategoriesReceived'],
      PersonAddresses: ['PersonAddress', 'personAddressesReceived'],
      Products: ['Product', 'productsReceived'],
      VisitorProducts: ['VisitorProduct', 'visitorProductsReceived'],
      ProductDetails: ['ProductDetail', 'productDetailsReceived'],
      PhotoGalleries: ['PhotoGallery', 'photoGalleriesReceived'],
      Pictures: ['Picture', 'picturesReceived'],
      ProductDetailStoreAssets: ['ProductDetailStoreAsset', 'productDetailStoreAssetsReceived'],
      Banks: ['Bank', 'banksReceived'],
      Missions: ['Mission', 'missionsReceived'],
      MissionDetails: ['MissionDetail', 'missionDetailsReceived'],
      Orders: ['Order', 'ordersReceived'],
      OrderDetails: ['OrderDetail', 'orderDetailsReceived'],
      PropertyDescriptions: ['PropertyDescription', 'propertyDescriptionsReceived'],
      Settings: ['Setting', 'settingReceived'],
      ExtraDatas: ['ExtraData', 'extraDataReceived']
    };

    for (const [key, [storeName, statusKey]] of Object.entries(dataMapping)) {
      this.handleData(dataObjects[key], storeName, statusKey);
    }
  }

  private handleData(dataArray: any[], storeName: string, statusKey: string) {
    if (dataArray && dataArray.length > 0) {
      this.dataStatus[statusKey] = true;
      this.dataCounts[statusKey] = dataArray.length;
      dataArray.forEach(ele => {
        const key: IDBValidKey = [+this.visitorId, ele[`${storeName}Id`]];
        this.indexedDbService.addOrEdit(storeName, ele, key);
      });
    }
  }
}
