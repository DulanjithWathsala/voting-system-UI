import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  private baseUrl: string = 'http://localhost:8080/api/party';

  constructor(private http: HttpClient) {}

  getAllParties(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve`, {
      headers: new HttpHeaders({
        Authorization: `${localStorage.getItem('authToken')}`,
      }),
    });
  }
}
