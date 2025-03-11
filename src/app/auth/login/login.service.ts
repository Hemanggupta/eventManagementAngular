import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

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
