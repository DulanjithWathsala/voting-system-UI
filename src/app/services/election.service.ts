import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectionService {
  private baseUrl: string = 'http://localhost:8080/api/election';

  constructor(private http: HttpClient) {}

  create(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, requestBody);
  }

  getAllElections(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve`);
  }

  updateElectionDetails(electionId: any, requestBody: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/update/${electionId}`,
      requestBody
    );
  }

  deleteElection(electionId: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${electionId}`);
  }

  startElection(electionId: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/start/${electionId}`, {});
  }

  endElection(electionId: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/end/${electionId}`, {});
  }
}
