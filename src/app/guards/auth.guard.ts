import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject Router properly
  const isAuthenticated = !!localStorage.getItem('isLoggedIn');
  console.log('AuthGuard Check: isAuthenticated =', isAuthenticated);

  if (!isAuthenticated) {
    router.navigate(['/auth']);
    return false; // Prevents further execution
  }

  return true; // Allows navigation
};
