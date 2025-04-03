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
      null
    );
  }

  checkUserIsCasted(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      `http://localhost:8080/api/user/${email}/hasVoted`
    );
  }

  getUserDetailsByEmail(email: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/api/user/by-email/${email}`
    );
  }

  castVote(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cast`, requestBody);
  }

  getResultsByElectionId(electionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/results/${electionId}`);
  }
}
