import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private baseUrl: string = 'http://localhost:8080/api/candidate';

  constructor(private http: HttpClient) {}

  create(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, requestBody, {
      headers: new HttpHeaders({
        Authorization: `${localStorage.getItem('authToken')}`,
      }),
    });
  }

  retrieveByNic(nic: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/user/by-nic/${nic}`, {
      headers: new HttpHeaders({
        Authorization: `${localStorage.getItem('authToken')}`,
      }),
    });
  }

  retrieveCandidesByElectionId(electionId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/retrieve/${electionId}`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
  }

  deleteCandidate(candidateId: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${candidateId}`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
  }

  retrieveCandidateNamesByIds(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/retrieve/by-ids`, requestBody, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
  }
}
