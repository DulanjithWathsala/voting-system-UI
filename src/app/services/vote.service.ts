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

  checkUserIsCasted(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      `http://localhost:8080/api/user/${email}/hasVoted`,
      {
        headers: new HttpHeaders({
          Authorization: `${localStorage.getItem('authToken')}`,
        }),
      }
    );
  }

  getUserDetailsByEmail(email: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/api/user/by-email/${email}`,
      {
        headers: new HttpHeaders({
          Authorization: `${localStorage.getItem('authToken')}`,
        }),
      }
    );
  }

  castVote(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cast`, requestBody, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
  }
}
