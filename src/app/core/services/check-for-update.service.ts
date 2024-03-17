import { ApplicationRef, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { UpdateConfirmationDialogComponent } from 'src/app/shared/modules/update-confirmation-dialog/update-confirmation-dialog.component';

@Injectable({ providedIn: 'root' })
export class CheckForUpdateService {

  constructor(appRef: ApplicationRef, updates: SwUpdate, private dialog: MatDialog) {
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(10 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await updates.checkForUpdate();
        console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
        if (updateFound) {
          const dialogRef = this.dialog.open(UpdateConfirmationDialogComponent);
          dialogRef.afterClosed().subscribe((result: any) => {
            console.log(result)
            if (result) {
              document.location.reload();
              console.log('Update done!');
            }
          });
        }
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }
}