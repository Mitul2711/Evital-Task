import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { FireStoreService } from 'src/app/Services/fire-store.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(FireStoreService)
  const router = inject(Router)
  return authService.isAuthenticated.pipe(
    take(1), // Ensure we only take the first emitted value
    map(isAuth => {
      if (isAuth) {
        return true; // Allow navigation if authenticated
      } else {
        router.navigate(['/login']); // Redirect to signin if not authenticated
        return false;
      }
    })
  );};
