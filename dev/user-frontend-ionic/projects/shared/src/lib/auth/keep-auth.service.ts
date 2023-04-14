import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { updateAuthToken } from './auth.repository';
import { Observable, of } from 'rxjs';
import { concatMap, delayWhen, tap } from 'rxjs/operators';
import { AuthenticatedUser, updateUser } from './authenticated-user.repository';
import { getRefreshAuthToken } from './keep-auth.repository';
import { Actions } from '@ngneat/effects-ng';
import { cleanupPrivateData } from '../shared.actions';


interface ReauthResult extends AuthenticatedUser {
    authToken: string;
}

@Injectable({
    providedIn: 'root'
})
export class KeepAuthService {

    constructor(
        @Inject('environment')
        private environment: any,
        private http: HttpClient,
        private actions: Actions,
    ) {}

    public reauthenticateIfAvailable(): Observable<ReauthResult | null> {
        return getRefreshAuthToken().pipe(
            concatMap(refreshAuthToken => refreshAuthToken ?
                this.reauthenticate(refreshAuthToken) :
                of(null)
            ),
            delayWhen(reauthResult => {
                if (!reauthResult) {
                    this.actions.dispatch(cleanupPrivateData({authToken: null}));
                    return;
                }

                const { authToken, ...authenticatedUser } = reauthResult;
                updateUser(authenticatedUser);
                return updateAuthToken(authToken);
            }),
        );
    }

    private reauthenticate(refreshAuthToken: string) {
        const url = `${this.environment.apiEndpoint}/keep-auth/reauth`;
        const headers = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: `Bearer ${refreshAuthToken}`
        };

        return this.http.post<ReauthResult | null>(url,
            { authToken: refreshAuthToken },
            { headers }
        );
    }
}

