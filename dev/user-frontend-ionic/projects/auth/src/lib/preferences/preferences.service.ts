import { Injectable } from '@angular/core';
import { deleteRefreshAuthToken, getRefreshAuthToken } from '@ul/shared';
import { concatMap, filter, finalize, take } from 'rxjs/operators';
import { KeepAuthService } from '../common/keep-auth.service';
import { setSaveCredentialsOnAuthentication } from './preferences.repository';

@Injectable({
    providedIn: 'root'
})
export class PreferencesService {

    constructor(
        private keepAuthService: KeepAuthService
    ) { }

    public saveCredentialsOnAuthenticationChange(saveCredentials: boolean) {
        setSaveCredentialsOnAuthentication(saveCredentials);

        if (saveCredentials === false) {
            this.removeSavedCredentialsIfExists();
        }
    }

    public removeSavedCredentialsIfExists() {
        return getRefreshAuthToken().pipe(
            take(1),
            filter(token => token != null),
            concatMap(token => this.keepAuthService.removeSavedCredentials(token)),
            finalize(() => deleteRefreshAuthToken())
        ).subscribe();
    }
}
