import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Info } from './info.repository';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient
  ) {}

  public getInfoList(): Observable<Info[]> {
    return this.http.get<Info[]>(`${this.environment.apiEndpoint}/info`);
  }

  public requestSsoServiceToken(service: string, authToken: string): Observable<string> {
    const url = `${this.environment.apiEndpoint}/sso-service-token`;
    const data = {
      authToken,
      service
    };

    return this.http.post<string>(url, data, {responseType: 'text' as 'json'}).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {

          if (err.status === 401) {
            return of(null);
          }

          return throwError(err);
        }
      }));
  }
}
