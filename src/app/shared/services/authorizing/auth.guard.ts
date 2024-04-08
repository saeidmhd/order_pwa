import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackbar = inject(MatSnackBar);

  return authService.isAuthenticated()
    .then(authResult => {
      if (!authResult) {
        snackbar.open('شما به آن صفحه دسترسی نداشتید', 'بستن', {
          duration: 5000,
          verticalPosition: 'top'
        });
        router.navigate(['/login']);
      }
      return true;
    });
};