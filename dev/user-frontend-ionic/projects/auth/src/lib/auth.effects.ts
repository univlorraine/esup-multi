import { Injectable } from '@angular/core';
import { createEffect, ofType} from '@ngneat/effects';
import { cleanupPrivateData, clearAuthenticatedUser, deleteRefreshAuthToken } from '@ul/shared';
import { catchError, first, switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthEffects {

  cleanupPrivateData$ = createEffect(actions => actions.pipe(
    ofType(cleanupPrivateData),
    tap(clearAuthenticatedUser),
    tap(() => deleteRefreshAuthToken().pipe(first()).subscribe()),
  ));
}