import { Component, OnInit } from '@angular/core';
import { Bank } from 'src/app/core/models/bazara/bazara-DTOs/Bank';
import { IndexedDbService } from 'src/app/core/services/indexed-db/indexed-db.service';
// import { IndexedDbService } from '../../../core/services/indexed-db.service';
// import { BanksService } from '../../../core/services/banks.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {
  banks: Bank[] = [];
  isLoading = false; // Add a new property to track loading state

  searchText = '';

get filteredBanks() {
  return this.banks.filter(bank =>
    bank.BankName.toLowerCase().includes(this.searchText.toLowerCase())
  );
}

  constructor(private indexedDbService: IndexedDbService) { }

  ngOnInit(): void {
    this.isLoading = true; // Set loading state to true at the start
    this.indexedDbService.getAllData<Bank>("Bank").then((banks: Bank[]) => {
      if (banks.length > 0) {
        this.banks = banks;
        this.isLoading = false; // Set loading state to false when data is loaded
      }
    });
  }
}