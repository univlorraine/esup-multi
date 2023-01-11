import { Injectable } from '@angular/core';
import { createEffect, ofType} from '@ngneat/effects';
import { cleanupPrivateData, clearAuthenticatedUser, deleteAuthToken, deleteRefreshAuthToken } from '@ul/shared';
import { first, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthEffects {

  cleanupPrivateData$ = createEffect(actions => actions.pipe(
    ofType(cleanupPrivateData),
    tap(clearAuthenticatedUser),
    tap(() => deleteAuthToken().pipe(first()).subscribe()),
    tap(() => deleteRefreshAuthToken().pipe(first()).subscribe()),
  ));
}
