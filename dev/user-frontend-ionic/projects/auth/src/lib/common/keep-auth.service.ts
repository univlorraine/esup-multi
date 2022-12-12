import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthenticatedUser, authenticatedUser$, updateUser, updateRefreshAuthToken } from '@ul/shared';
import { Observable, of, throwError, EMPTY } from 'rxjs';
import { catchError, concatMap, delayWhen, tap, first } from 'rxjs/operators';

interface KeepAuthenticatedUser extends AuthenticatedUser {
  refreshAuthToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class KeepAuthService {


  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthenticatedUser | null> {

    const url = `${this.environment.apiEndpoint}/keep-auth/auth`;
    const data = {
      username,
      password,
    };

    return this.http.post<KeepAuthenticatedUser>(url, data, {}).pipe(
      tap(keepAuthenticatedUser => {
        const { refreshAuthToken, ...authenticatedUser } = keepAuthenticatedUser;
        updateUser(authenticatedUser);
      }),
      delayWhen(keepAuthenticatedUser => {
        if (!keepAuthenticatedUser) {
          return;
        }

        return updateRefreshAuthToken(keepAuthenticatedUser.refreshAuthToken);
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {

          if (err.status === 401) {
            return of(null);
          }

          return throwError(err);
        }
      }));
  }

  logout(refreshAuthToken: string): Observable<boolean> {
    const url = `${this.environment.apiEndpoint}/keep-auth/auth`;
    const headers = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${refreshAuthToken}`
    };

    return authenticatedUser$.pipe(
      first(),
      concatMap((authenticatedUser) => {
        if(!authenticatedUser) {
          return EMPTY;
        }

        return this.http.delete<boolean>(url, {
          headers,
          body: {
            authToken: authenticatedUser.authToken
          }
        });
      }),
    );
  }

  removeSavedCredentials(refreshAuthToken: string): Observable<boolean> {
    const url = `${this.environment.apiEndpoint}/keep-auth/reauth`;
    const headers = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${refreshAuthToken}`
    };

    return this.http.delete<boolean>(url, { headers });
  }
}
