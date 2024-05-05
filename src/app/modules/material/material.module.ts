import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

const MaterialComponents = [
  MatSnackBarModule,
  MatCardModule,
  MatExpansionModule,
  MatDividerModule,
  MatBadgeModule,
  MatMenuModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }