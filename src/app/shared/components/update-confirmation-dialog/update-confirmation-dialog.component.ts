import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-confirmation-dialog',
  templateUrl: './update-confirmation-dialog.component.html',
})
export class UpdateConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<UpdateConfirmationDialogComponent>) {}

  // Called when the user clicks "Update"
  confirmUpdate(): void {
    this.dialogRef.close(true);
  }

  // Called when the user clicks "Cancel"
  cancelUpdate(): void {
    this.dialogRef.close(false);
    console
  }
}
