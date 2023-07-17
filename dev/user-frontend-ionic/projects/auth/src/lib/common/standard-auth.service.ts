import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthenticatedUser, getAuthToken, updateAuthToken, updateUser } from '@ul/shared';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, delayWhen, take } from 'rxjs/operators';

interface LoginResult extends AuthenticatedUser {
  authToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class StandardAuthService {


  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthenticatedUser | null> {

    const url = `${this.environment.apiEndpoint}/auth`;
    const data = {
      username,
      password,
    };

    return this.http.post<LoginResult>(url, data, {}).pipe(
      delayWhen(loginResult => {
        const { authToken, ...authenticatedUser } = loginResult;
        updateUser(authenticatedUser);
        return updateAuthToken(authToken);
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

  logout(): Observable<boolean> {
    const url = `${this.environment.apiEndpoint}/auth`;

    return getAuthToken().pipe(
      take(1),
      concatMap(authToken => this.http.delete<boolean>(url, {
        body: { authToken }
      }))
    );
  }
}
