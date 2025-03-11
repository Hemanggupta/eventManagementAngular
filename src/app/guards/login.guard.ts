import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = !!localStorage.getItem('user');

  if (isAuthenticated) {
    const router = new Router();
    router.navigate(['/events']);
    return false;
  }

  return true;
};
