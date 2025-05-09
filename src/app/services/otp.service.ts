import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  private baseUrl: string = 'http://localhost:8080/api/verification';

  constructor(private http: HttpClient) {}

  generateOtp(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/generate`, null, {
      params: new HttpParams().set('email', email),
    });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/verify`, null, {
      params: new HttpParams().set('email', email).set('otp', otp),
    });
  }
}
