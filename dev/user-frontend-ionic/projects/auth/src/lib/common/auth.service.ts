import { Injectable } from '@angular/core';
import { AuthenticatedUser, getRefreshAuthToken } from '@ul/shared';
import { Observable } from 'rxjs';
import { KeepAuthService } from './keep-auth.service';
import { StandardAuthService } from './standard-auth.service';
import { saveCredentialsOnAuthentication$ } from '../preferences/preferences.repository';
import { concatMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private standardAuthService: StandardAuthService,
    private keepAuthService: KeepAuthService,
  ) { }

  login(username: string, password: string): Observable<AuthenticatedUser | null> {
    return saveCredentialsOnAuthentication$.pipe(
      first(),
      concatMap(saveCredentialsOnAuthentication => saveCredentialsOnAuthentication ?
        this.keepAuthService.login(username, password) :
        this.standardAuthService.login(username, password)
      )
    );
  }

  logout(): Observable<boolean> {
    return getRefreshAuthToken().pipe(
      concatMap(token => token ?
        this.keepAuthService.logout(token) :
        this.standardAuthService.logout()
      )
    );
  }
}
