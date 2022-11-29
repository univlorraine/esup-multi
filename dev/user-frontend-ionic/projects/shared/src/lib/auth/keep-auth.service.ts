import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { AuthenticatedUser, updateUser } from './authenticated-user.repository';
import { getRefreshAuthToken } from './keep-auth.repository';

@Injectable({
    providedIn: 'root'
})
export class KeepAuthService {

    constructor(
        @Inject('environment')
        private environment: any,
        private http: HttpClient,
    ) {}

    public reauthenticateIfAvailable(): Observable<AuthenticatedUser | null> {
        return getRefreshAuthToken().pipe(
            concatMap(refreshAuthToken => refreshAuthToken ?
                this.reauthenticate(refreshAuthToken) :
                of(null)
            ),
            tap(authenticatedUser => {
                updateUser(authenticatedUser);
            }),
        );
    }

    private reauthenticate(refreshAuthToken: string) {
        const url = `${this.environment.apiEndpoint}/keep-auth/reauth`;
        const headers = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: `Bearer ${refreshAuthToken}`
        };

        return this.http.post<AuthenticatedUser | null>(url,
            { authToken: refreshAuthToken },
            { headers }
        );
    }
}

