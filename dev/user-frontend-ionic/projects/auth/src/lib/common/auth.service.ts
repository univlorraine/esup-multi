import { Injectable } from '@angular/core';
import { Actions } from '@ngneat/effects-ng';
import {
  authenticate, AuthenticatedUser,
  cleanupPrivateData, getAuthToken, getRefreshAuthToken, updateAuthenticatedUsername
} from '@ul/shared';
import { Observable } from 'rxjs';
import { concatMap, take, tap } from 'rxjs/operators';
import { saveCredentialsOnAuthentication$ } from '../preferences/preferences.repository';
import { KeepAuthService } from './keep-auth.service';
import { StandardAuthService } from './standard-auth.service';

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
      take(1),
      tap(() => this.cleanupPrivateData()),
      concatMap(saveCredentialsOnAuthentication => saveCredentialsOnAuthentication ?
        this.keepAuthService.login(username, password) :
        this.standardAuthService.login(username, password)
      ),
      tap(() => updateAuthenticatedUsername(username)),
    );
  }

  logout(): Observable<boolean> {
    return getRefreshAuthToken().pipe(
      tap(() => this.cleanupPrivateData()),
      concatMap(token => token ?
        this.keepAuthService.logout(token) :
        this.standardAuthService.logout()
      )
    );
  }

  cleanupPrivateData() {
    getAuthToken().subscribe(token => this.actions.dispatch(cleanupPrivateData({authToken: token})));
  }

  dispatchLoginAction() {
    this.actions.dispatch(authenticate());
  }
}
