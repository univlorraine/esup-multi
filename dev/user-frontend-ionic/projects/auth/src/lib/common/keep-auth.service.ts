import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthenticatedUser, getAuthToken, updateAuthToken, updateRefreshAuthToken, updateUser } from '@ul/shared';
import { EMPTY, Observable, of, throwError, zip } from 'rxjs';
import { catchError, concatMap, delayWhen, take } from 'rxjs/operators';

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
      take(1),
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
