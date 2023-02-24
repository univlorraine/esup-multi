import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { KeepAuthService } from '../auth/keep-auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap, filter, first, map, switchMap } from 'rxjs/operators';
import { SsoExternalLinkQueryDto, SsoServiceTokenQueryDto } from './sso.dto';
import { getAuthToken } from '../auth/auth.repository';

@Injectable({
    providedIn: 'root'
})
export class SsoService {

    constructor(
        @Inject('environment')
        private environment: any,
        private http: HttpClient,
        private keepAuthService: KeepAuthService,
    ) {}

    public getSsoExternalLink(query: SsoExternalLinkQueryDto): Observable<string> {
        return getAuthToken().pipe(
            first(),
            filter(authToken => authToken != null),
            switchMap(authToken => this.requestSsoServiceToken({
                service: query.service,
                authToken,
            })),
            map(ssoServiceToken => query.urlTemplate.replace('{st}', ssoServiceToken))
        );
    }

    private requestSsoServiceToken(query: SsoServiceTokenQueryDto): Observable<string> {
        const url = `${this.environment.apiEndpoint}/sso-service-token`;

        return this.http.post<string>(url, query, {responseType: 'text' as 'json'}).pipe(
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
                this.http.post<string>(url, {...query, authToken: authenticatedUser.authToken}, {responseType: 'text' as 'json'}) :
                throwError(err)
              )
            );
        }));
    }
}
