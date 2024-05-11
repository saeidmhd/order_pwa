import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { IPeople_Addresses } from 'src/app/core/models/bazara/result-DTOs/IPeople_Addresses';
import { MapComponent } from '../map.component';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css'
})
export class PersonDetailComponent implements OnInit {

  selectedItem!: IPeople_Addresses;

  constructor(private bottomSheetRef: MatBottomSheetRef<MapComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public personSelected: any) { }

  ngOnInit(): void {
    console.log(this.personSelected);
  }
}
