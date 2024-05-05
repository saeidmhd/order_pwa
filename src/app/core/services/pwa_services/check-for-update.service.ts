import { ApplicationRef, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { UpdateConfirmationDialogComponent } from 'src/app/shared/components/update-confirmation-dialog/update-confirmation-dialog.component';
import { UtilityService } from '../common/utility.service';

@Injectable({ providedIn: 'root' })
export class CheckForUpdateService {

  constructor(appRef: ApplicationRef, updates: SwUpdate, private dialog: MatDialog, utilityService: UtilityService) {
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(5 * 60 * 1000);
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
            }
            else {
              utilityService.updateExist.next(true);
            }
          });
        }
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }
}