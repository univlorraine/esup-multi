import { Injectable } from '@angular/core';
import { createEffect, ofType} from '@ngneat/effects';
import { cleanupPrivateData } from '@ul/shared';
import { tap } from 'rxjs/operators';
import { clearUserClockingData } from './clocking.repository';

@Injectable({ providedIn: 'root' })
export class ClockingEffects {

  cleanupPrivateData$ = createEffect(actions => actions.pipe(
    ofType(cleanupPrivateData),
    tap(clearUserClockingData),
  ));
}
