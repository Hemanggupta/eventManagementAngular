import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private readonly router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // Check if token exists
  }

  loginUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true'); // Store as string
    this.router.navigate(['/events']);
  }

  // Logout User (remove token)
  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/auth']);
  }

  signup(user: { userName: string; userEmail: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  login(userEmail: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?userEmail=${userEmail}&password=${password}`);
  }

  // check if email is already registered
  checkEmail(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?userEmail=${email}`);
  }
}
