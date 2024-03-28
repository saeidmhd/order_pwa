import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';
import { UpdateConfirmationDialogComponent } from 'src/app/shared/components/update-confirmation-dialog/update-confirmation-dialog.component';

@Injectable({ providedIn: 'root' })
export class PromptUpdateService {

  constructor(private swUpdate: SwUpdate , private dialog:MatDialog) {
    console.log("prompt")
    swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(async evt => {
        console.log(evt.type + " latestVersion = " + evt.latestVersion + " currentVersion = " + evt.currentVersion)
        const dialogRef = this.dialog.open(UpdateConfirmationDialogComponent);
        dialogRef.afterClosed().subscribe((result: any) => {
          console.log(result)
          if (result) {
            document.location.reload();
            console.log('Update done!');
          }
        });
      });
  }
}
