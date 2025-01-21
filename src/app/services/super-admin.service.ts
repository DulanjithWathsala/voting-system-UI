import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminService {
  private baseUrl: string = 'http://localhost:8080/api/super-admin';

  constructor(private http: HttpClient) {}

  createElectionAdmin(nic: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/create-election-admin/${nic}`,
      null,
      {
        headers: new HttpHeaders({
          Authorization: `${localStorage.getItem('authToken')}`,
        }),
      }
    );
  }

  getAllElectionAdmins(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/retrieve-all`, {
      headers: new HttpHeaders({
        Authorization: `${localStorage.getItem('authToken')}`,
      }),
    });
  }

  deleteElectionAdmin(nic: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-election-admin/${nic}`, {
      headers: new HttpHeaders({
        Authorization: `${localStorage.getItem('authToken')}`,
      }),
    });
  }
}
