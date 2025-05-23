import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BallotService {
  private baseUrl: string = 'http://localhost:8080/api/ballot';

  constructor(private http: HttpClient) {}

  create(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create-ballot`, requestBody);
  }

  retrieveBallotByElectionId(electionId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/retrieve-ballot/${electionId}`);
  }

  deleteBallot(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete-ballot/${id}`);
  }
}
