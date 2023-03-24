import { Injectable } from '@angular/core';
import { createEffect, ofType} from '@ngneat/effects';
import { cleanupPrivateData } from '@ul/shared';
import { tap } from 'rxjs/operators';
import { clearTiles } from '@ul/shared';

@Injectable({ providedIn: 'root' })
export class TilesEffects {

  cleanupPrivateData$ = createEffect(actions => actions.pipe(
    ofType(cleanupPrivateData),
    tap(clearTiles),
  ));
}
