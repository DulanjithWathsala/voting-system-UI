import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private baseUrl: string = 'http://localhost:8080/api/vote';

  constructor(private http: HttpClient) {}

  checkUserIsVerified(email: string): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/api/user/check-verification`,
      null,
      {
        params: new HttpParams().set('email', email),
        headers: new HttpHeaders({
          Authorization: `${localStorage.getItem('authToken')}`,
        }),
      }
    );
  }
}
