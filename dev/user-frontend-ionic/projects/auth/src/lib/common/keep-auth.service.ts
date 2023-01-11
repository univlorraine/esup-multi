import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthenticatedUser, updateUser, updateRefreshAuthToken, getAuthToken, updateAuthToken } from '@ul/shared';
import { Observable, of, throwError, EMPTY, zip, forkJoin } from 'rxjs';
import { catchError, concatMap, delayWhen, tap, first, switchMap } from 'rxjs/operators';

interface KeepAuthenticatedUser extends AuthenticatedUser {
  refreshAuthToken: string;
  authToken: string;
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
      delayWhen(keepAuthenticatedUser => {
        if (!keepAuthenticatedUser) {
          return;
        }

        const {
          refreshAuthToken,
          authToken,
          ...authenticatedUser
        } = keepAuthenticatedUser;
        updateUser(authenticatedUser);
        return zip(
          updateRefreshAuthToken(refreshAuthToken),updateAuthToken(authToken)
        );
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

    return getAuthToken().pipe(
      first(),
      concatMap((authToken) => {
        if(!authToken) {
          return EMPTY;
        }

        return this.http.delete<boolean>(url, {
          headers,
          body: {
            authToken
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
