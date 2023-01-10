import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { KeepAuthService } from '@ul/shared';

@Injectable({
  providedIn: 'root'
})
export class TileInfoService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    private keepAuthService: KeepAuthService,
  ) {}

  public requestSsoServiceToken(service: string, authToken: string): Observable<string> {
    const url = `${this.environment.apiEndpoint}/sso-service-token`;
    const data = {
      authToken,
      service
    };

    return this.http.post<string>(url, data, {responseType: 'text' as 'json'}).pipe(
      catchError(err => {
        // do not handle non HTTP errors
        if (!(err instanceof HttpErrorResponse)) {
          return throwError(err);
        }

        // do not handle non 401 HTTP errors
        if (err.status !== 401) {
          return throwError(err);
        }

        // in case of error 401 user authentication is expired, we try to reauthenticate
        // (available if user has allowed saving his credentials)
        return this.keepAuthService.reauthenticateIfAvailable().pipe(
          concatMap(authenticatedUser => authenticatedUser ?
            this.http.post<string>(url, {...data, authToken: authenticatedUser.authToken}, {responseType: 'text' as 'json'}) :
            throwError(err)
          )
        );
      }));
  }
}
