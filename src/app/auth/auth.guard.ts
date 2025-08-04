import { inject } from '@angular/core';
import { Router } from '@angular/router';

export function authGuard() {
  const router = inject(Router);
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    router.navigate(['/login']);
    return false;
  }
  
  return true;
}