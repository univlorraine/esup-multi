import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions } from '@ngneat/effects-ng';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, concatMap, finalize, take } from 'rxjs/operators';
import { cleanupPrivateData } from '../shared.actions';
import { getAuthToken } from './auth.repository';
import { KeepAuthService } from './keep-auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public isRefreshingToken = false;
  private refreshTokenTrigger$ = new Subject<string>();

  constructor(
    private keepAuthService: KeepAuthService,
    private actions: Actions
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoginRequest = request.url.includes('/auth');

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (!(err instanceof HttpErrorResponse)) {
          return throwError(err);
        }

        if (isLoginRequest) {
          getAuthToken().pipe(take(1)).subscribe(token => this.actions.dispatch(cleanupPrivateData({ authToken: token })));
          return throwError(err);
        }

        if (err.status !== 401 && err.status !== 423) {
          return throwError(err);
        }

        if (!this.isRefreshingToken) {
          this.isRefreshingToken = true;

          return this.keepAuthService.reauthenticateIfAvailable().pipe(
            concatMap((authenticatedUser) => {

              if (!authenticatedUser) {
                return throwError(err);
              }

              const newBody = {
                ...request.body,
                authToken: authenticatedUser.authToken,
              };

              request = request.clone({
                body: newBody,
              });

              this.refreshTokenTrigger$.next(authenticatedUser.authToken);
              return next.handle(request);

            }),
            catchError((error) => throwError(error)),
            finalize(() => this.isRefreshingToken = false));

        } else {
          return this.refreshTokenTrigger$.pipe(
            concatMap((authToken) => {

              if (!authToken) {
                return throwError(err);
              }

              const newBody = {
                ...request.body,
                authToken,
              };

              const clonedRequest = request.clone({
                body: newBody,
              });

              return next.handle(clonedRequest);
            })
          );
        }
      })
    );
  }
}
