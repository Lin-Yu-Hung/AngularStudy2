import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  switchMap,
  throwError,
  timeout,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private apiDomain: string = 'https://fakestoreapi.com';
  private defaultTimeout: number = 10000; // 10 seconds

  get<T>(endpoint: string): Observable<HttpResponse<T>> {
    const url = `${this.apiDomain}/${endpoint}`;
    return this.http.get<T>(url, { observe: 'response' }).pipe(
      timeout(this.defaultTimeout),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          return throwError(() => new Error('Request timed out'));
        }
        return throwError(() => error);
      }),
    );
  }

  post<T>(endpoint: string, body: T): Observable<T> {
    const url = `${this.apiDomain}/${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<T>(url, body, { headers });
  }
  put<T>(endpoint: string, body: T): Observable<HttpResponse<T>> {
    const url = `${this.apiDomain}/${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<T>(url, body, { headers, observe: 'response' });
  }

  getxx() {
    return this.get('').pipe(
      switchMap((res) => this.post<any>('2', res)),
      switchMap((res) => this.post<any>('2', res)),
      switchMap((res) => this.post<any>('2', res)),
    );

    return forkJoin([this.get(''), this.get(''), this.get('')]).pipe(
      map(([tes1, test2, test3]) => {
        return '';
      }),
    );
  }
}
