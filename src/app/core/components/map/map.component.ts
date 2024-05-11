import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import * as L from "leaflet";

import { IBazaraPerson } from '../../models/bazara/bazara-DTOs/IBazaraPerson';
import { IBazaraPersonAddress } from '../../models/bazara/bazara-DTOs/IBazaraPersonAddress';
import { IPeople_Addresses, IPersonAddress } from '../../models/bazara/result-DTOs/IPeople_Addresses';
import { UtilityService } from '../../services/common/utility.service';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { IndexedDbService } from '../../services/indexed-db/indexed-db.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  map!: L.Map;
  icon = L.icon({
    iconUrl: '/assets/icons/marker.svg'
  });

  iconOption = {
    draggable: false, 
    icon: this.icon
  };

  data: any[] = [];
  people: IPeople_Addresses[] = [];
  person: IPeople_Addresses = {
    personId: 0,
    name: '',
    personAddresses: [
      // { address: '', latitude: 0, longitude: 0, mobile: 0, personAddressId: 0, title: '' }
    ]
  };

  constructor(private indexedDbService: IndexedDbService, private utilityService: UtilityService, private bottomSheet: MatBottomSheet) {
    this.utilityService.showHeaderFooter.next('map');
  }

  ngOnInit(): void {
    this.initMap();
    this.getData();
  }

  initMap() {
    this.map = L.map('map', {
      center: [36.299961, 59.58400],
      zoom: 10
    });

    const tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  async getData() {
    this.data.push(this.getPeople());
    this.data.push(this.getPersonAddresses());

    Promise.all(this.data).then(val => {
      this.compoundData(val);
    });
  }

  async getPeople(): Promise<IBazaraPerson[]> {
    return new Promise((resolve, reject) => {
      this.indexedDbService.getAllData<IBazaraPerson>('Person').then(people => {
        resolve(people);
      });
    });
  }

  async getPersonAddresses(): Promise<IBazaraPersonAddress[]> {
    return new Promise((resolve, reject) => {
      this.indexedDbService.getAllData<IBazaraPersonAddress>('PersonAddress').then(personAddresses => {
        resolve(personAddresses);
      });
    });
  }

  compoundData(val: any) {
    val[0].forEach((perosn: IBazaraPerson) => {
      // this.el = { personId: 0, name: '', personAddresses: [] }
      this.person.personId = perosn.PersonId;
      this.person.name = perosn.FirstName + ' ' + perosn.LastName;
      val[1].forEach((personAddress: IBazaraPersonAddress) => {
        if (personAddress.PersonId == perosn.PersonId) {
          this.person.personAddresses.push({
            address: personAddress.Address,
            latitude: personAddress.Latitude,
            longitude: personAddress.Longitude,
            mobile: personAddress.Mobile,
            personAddressId: personAddress.PersonAddressId,
            title: personAddress.Title
          });
        }
      });
      this.people.push(this.person);
    });
    this.setDataOnMap(this.people);
  }

  setDataOnMap(people: IPeople_Addresses[]) {
    people.forEach(el => {
      el.personAddresses.forEach(element => {
        let _marker = new L.Marker([element.latitude, element.longitude], this.iconOption).addTo(this.map);

        _marker.on('click', event => {
          // console.log(element);
          // console.log(this.person);
          this.person.personAddresses.filter(x => x.personAddressId == element.personAddressId);
          // this.person.personId = el.personId;
          // this.person.name = el.name;
          // this.person.personAddresses(element);
            this.openBottomSheet(this.person);
        });
      });
    });
  }

  openBottomSheet(person: IPeople_Addresses) {
    const config: MatBottomSheetConfig = {data: { person }
      // , panelClass: 'bottomsheet-map'
    }; 
    const bottomSheetReef = this.bottomSheet.open(PersonDetailComponent, config);
    
  }
}