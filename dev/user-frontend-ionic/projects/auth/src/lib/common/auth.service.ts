import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthenticatedUser, authenticatedUser$, updateUser } from '@ul/shared';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, first, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


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

    return this.http.post<AuthenticatedUser>(url, data, {}).pipe(
      tap(authenticatedUser => updateUser(authenticatedUser)),
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

    return authenticatedUser$.pipe(
      first(),
      map(authenticatedUser => authenticatedUser.authToken),
      concatMap(authToken => this.http.delete<boolean>(url, {
        body: { authToken }
      })),
      tap(() => updateUser(null))
    );
  }
}
