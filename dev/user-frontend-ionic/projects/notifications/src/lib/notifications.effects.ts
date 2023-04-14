import { Injectable } from '@angular/core';
import { createEffect, ofType} from '@ngneat/effects';
import { authenticate, cleanupPrivateData } from '@ul/shared';
import { concatMap, filter, tap } from 'rxjs/operators';
import { NotificationsService } from './notifications.service';

@Injectable({ providedIn: 'root' })
export class NotificationsEffects {
    sendFCMToken$ = createEffect(actions => actions.pipe(
        ofType(authenticate),
        tap(() => this.notificationsService.saveFCMToken()),
    ));
    cleanupPrivateData$ = createEffect(actions => actions.pipe(
        ofType(cleanupPrivateData),
        filter((payload) => payload.authToken != null),
        concatMap((payload) => this.notificationsService.unregisterFCMToken(payload.authToken))
    ));
    constructor(
        private notificationsService: NotificationsService,
    ) {}
}
