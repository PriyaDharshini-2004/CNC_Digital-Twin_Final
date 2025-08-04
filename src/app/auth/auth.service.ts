import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      // In a real application, this would be an API call
      setTimeout(() => {
        if (username === 'admin' && password === 'password') {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify({ username, role: 'admin' }));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}