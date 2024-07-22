import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private apiDomain: string = 'https://fakestoreapi.com';

  get<T>(endpoint: string): Observable<HttpResponse<T>> {
    const url = `${this.apiDomain}/${endpoint}`;
    return this.http.get<T>(url, { observe: 'response' });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.apiDomain}/${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<T>(url, body, { headers });
  }
}
