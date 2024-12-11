import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Actions } from '@ngneat/effects-ng';
import { TranslateService } from '@ngx-translate/core';
import {
  AlertsService,
  cleanupPrivateData,
  getAuthToken,
  getExpectedErrorMessage,
  NetworkService
} from '@multi/shared';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandler implements ErrorHandler {
  private translateService: TranslateService;

  constructor(
    private actions: Actions,
    private alertsService: AlertsService,
    private injector: Injector,
    private networkService: NetworkService,
  ) { }

  async handleError(error: Error | HttpErrorResponse) {
    this.loadTranslateService();
    if (error instanceof HttpErrorResponse) {
      await this.handleHttpError(error as HttpErrorResponse);
    }

    if (error) {
      console.error(error);
    }
  }

  private async handleHttpError(error: HttpErrorResponse) {
    if (!(await this.networkService.getConnectionStatus()).connected) {
      return this.alertsService.enqueueAlert({
        header: this.translateService.instant('ERROR.NO_NETWORK.TITLE'),
        message: this.translateService.instant('ERROR.NO_NETWORK.MESSAGE'),
        type: 'error',
        priority: 10
      });
    }

    switch (error.status) {
      case 0:
        return this.alertsService.enqueueAlert({
          header: this.translateService.instant('ERROR.SERVICE_UNREACHABLE.TITLE'),
          message: this.translateService.instant('ERROR.SERVICE_UNREACHABLE.MESSAGE'),
          type: 'error',
          priority: 10
        });

      case 401: {
        getAuthToken()
          .pipe(take(1))
          .subscribe((token) =>
            this.actions.dispatch(cleanupPrivateData({ authToken: token }))
          );
        return this.alertsService.enqueueAlert({
          header: this.translateService.instant('ERROR.UNAUTHENTICATED.TITLE'),
          message: this.translateService.instant('ERROR.UNAUTHENTICATED.MESSAGE'),
          type: 'error',
          priority: 10
        });
      }

      case 500: {
        const expectedErrorMessage = getExpectedErrorMessage(error);
        if (expectedErrorMessage) {
          return this.alertsService.enqueueAlert({
            header: this.translateService.instant('ERROR.WARNING.TITLE'),
            message: expectedErrorMessage,
            type: 'warning',
            priority: 20
          });
        }
        return this.alertsService.enqueueAlert({
          header: this.translateService.instant('ERROR.UNKNOWN'),
          message: error.message,
          type: 'generic',
          priority: 15
        });
      }

      default:
        return this.alertsService.enqueueAlert({
          header: this.translateService.instant('ERROR.UNKNOWN'),
          message: error.message,
          type: 'generic',
          priority: 15
        });
    }
  }

  /**
   * Ugly hack because injecting TranslateService directly in constructor breaks multi-module internationalization
   * due to ErrorHandler being processed early in app init mechanism.
   */
  private loadTranslateService() {
    if (this.translateService) {
      return;
    }

    this.translateService = this.injector.get(TranslateService);
  }
}
