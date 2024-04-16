import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { PeopleService } from 'src/app/core/services/people.service';
import { VisitorPeopleService } from 'src/app/core/services/visitor-person.service';
import { GenericIndexedDbService } from '../../services/indexed-db/generic-indexed-db.service';
import { IGetBazaraData } from '../../models/bazara-models/get-all-data-DTOs/IGetBazaraData';
import { BazaraService } from '../../services/bazara/bazara.service';
import { IBazaraPersonAddress } from '../../models/bazara-models/bazara-DTOs/IBazaraPersonAddress';
import { IApiResult } from '../../models/bazara-models/get-all-data-DTOs/IApiResult';
import { IBazaraPerson } from '../../models/bazara-models/bazara-DTOs/IBazaraPerson';
import { IBazaraProduct } from '../../models/bazara-models/bazara-DTOs/IBazaraProduct';
import { IBazaraVisitorProduct } from '../../models/bazara-models/bazara-DTOs/IBazaraVisitorProduct';
import { IBazaraProductDetail } from '../../models/bazara-models/bazara-DTOs/IBazaraProductDetail';

@Component({
  selector: 'app-get-bazara-data',
  standalone: true,
  imports: [],
  templateUrl: './get-bazara-data.component.html',
  styleUrl: './get-bazara-data.component.css'
})
export class GetBazaraDataComponent implements OnInit {

  terminate: boolean = false;
  maxRowVersionModel: IGetBazaraData = {};

  constructor(private peopleService: PeopleService,
    private visitorPeopleService: VisitorPeopleService,
    private genericIndexedDbService: GenericIndexedDbService,
    private bazaraService: BazaraService) { }

  ngOnInit(): void {
    this.fetchAllData();
  }

  async fetchAllData() {
    if (this.terminate == false) {
      // await this.fetchPeople_VisitorPeople();
    }
    if (this.terminate == false) {
      await this.fetchPersonAddresses();
    }
    if (this.terminate == false) {
      await this.fetchProduct_VisitorProduct();
    }
    if (this.terminate == false) {
      await this.fetchProductDetail();
    }
  }

  private async fetchPeople_VisitorPeople(): Promise<void> {
    try {
      // await firstValueFrom(this.peopleService.getPeople());
      // this.peopleReceived = true;
      // Store people in IndexedDB

      this.maxRowVersionModel.fromPersonVersion = await this.genericIndexedDbService.getMaxRowVersion('Person');
      this.maxRowVersionModel.fromVisitorPersonVersion = await this.genericIndexedDbService.getMaxRowVersion('VisitorPerson');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {          
          if (res.Result) {
            const visitorId = localStorage.getItem(('VisitorId'))!;
            let people: IBazaraPerson[] = res.Data.Objects.People;
            // let visitorPeople: IBazaVisi
            people.forEach(ele => {
              ele.VisitorId = visitorId
            });

            this.genericIndexedDbService.insertingToDb('Person', people);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });

    } catch (error) {
      console.error('Error fetching people:', error);
      // if (error.Message == 'Unauthorized')
      this.terminate = true;
    }
  }

  private async fetchVisitorPeople(): Promise<void> {
    try {
      await firstValueFrom(this.visitorPeopleService.getVisitorPeople());
      // await this.visitorPeopleService.getVisitorPeople();
      // this.visitorPeopleReceived = true;
    } catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }

  private async fetchPersonAddresses() {
    try {
      this.maxRowVersionModel.fromPersonAddressVersion = await this.genericIndexedDbService.getMaxRowVersion('PersonAddress');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {          
          if (res.Result) {
            const visitorId = localStorage.getItem(('VisitorId'))!;
            let obj: IBazaraPersonAddress[] = res.Data.Objects.PersonAddresses;
            obj.forEach(ele => {
              ele.VisitorId = +visitorId;
            });

            this.genericIndexedDbService.insertingToDb('PersonAddress', obj);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }

  private async fetchProduct_VisitorProduct() {
    try {
      this.maxRowVersionModel.fromProductVersion = await this.genericIndexedDbService.getMaxRowVersion('Product');
      this.maxRowVersionModel.fromVisitorProductVersion = await this.genericIndexedDbService.getMaxRowVersion('VisitorProduct');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {          
          if (res.Result) {
            const visitorId = localStorage.getItem(('VisitorId'))!;

            let products: IBazaraProduct[] = res.Data.Objects.Products;
            let visitorProducts: IBazaraVisitorProduct[] = res.Data.Objects.VisitorProducts;
            products.forEach(ele => {
              ele.VisitorId = +visitorId;
            });

            this.genericIndexedDbService.insertingToDb('Product', products);
            this.genericIndexedDbService.insertingToDb('VisitorProduct', visitorProducts);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }

  private async fetchProductDetail() {
    try {
      this.maxRowVersionModel.fromProductDetailVersion = await this.genericIndexedDbService.getMaxRowVersion('ProductDetail');

      this.bazaraService.getBazaraData(this.maxRowVersionModel!).subscribe({
        next: (res: IApiResult) => {          
          if (res.Result) {
            const visitorId = localStorage.getItem(('VisitorId'))!;
            let obj: IBazaraProductDetail[] = res.Data.Objects.ProductDetails;
            obj.forEach(ele => {
              ele.VisitorId = +visitorId;
            });

            this.genericIndexedDbService.insertingToDb('ProductDetail', obj);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    catch (error) {
      console.error('Error fetching visitor people:', error);
      this.terminate = true;
    }
  }
}