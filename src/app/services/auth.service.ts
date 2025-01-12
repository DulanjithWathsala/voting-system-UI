import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  registration(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, requestBody);
  }

  login(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, requestBody);
  }
}
