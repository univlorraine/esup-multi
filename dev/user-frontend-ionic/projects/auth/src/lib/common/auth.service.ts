import { Injectable } from '@angular/core';
import { AuthenticatedUser, cleanupPrivateData, getRefreshAuthToken } from '@ul/shared';
import { Observable } from 'rxjs';
import { concatMap, first, tap } from 'rxjs/operators';
import { saveCredentialsOnAuthentication$ } from '../preferences/preferences.repository';
import { KeepAuthService } from './keep-auth.service';
import { StandardAuthService } from './standard-auth.service';
import { Actions } from '@ngneat/effects-ng';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private actions: Actions,
    private standardAuthService: StandardAuthService,
    private keepAuthService: KeepAuthService,
  ) { }

  login(username: string, password: string): Observable<AuthenticatedUser | null> {
    return saveCredentialsOnAuthentication$.pipe(
      first(),
      tap(() => this.cleanupPrivateData()),
      concatMap(saveCredentialsOnAuthentication => saveCredentialsOnAuthentication ?
        this.keepAuthService.login(username, password) :
        this.standardAuthService.login(username, password)
      ),
    );
  }

  logout(): Observable<boolean> {
    return getRefreshAuthToken().pipe(
      concatMap(token => token ?
        this.keepAuthService.logout(token) :
        this.standardAuthService.logout()
      ),
      tap((logoutSuccess) => logoutSuccess && this.cleanupPrivateData()),
    );
  }

  cleanupPrivateData() {
    this.actions.dispatch(cleanupPrivateData());
  }
}
