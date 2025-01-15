import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  private baseUrl: string = 'http://localhost:8080/api/party';

  constructor(private http: HttpClient) {}

  create(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, requestBody, {
      headers: new HttpHeaders({
        Authorization: `${localStorage.getItem('authToken')}`,
      }),
    });
  }

  getAllParties(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve`, {
      headers: new HttpHeaders({
        Authorization: `${localStorage.getItem('authToken')}`,
      }),
    });
  }

  updatePartyDetails(partyId: any, requestBody: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/update/${partyId}`,
      requestBody,
      {
        headers: new HttpHeaders({
          Authorization: `${localStorage.getItem('authToken')}`,
        }),
      }
    );
  }
}
