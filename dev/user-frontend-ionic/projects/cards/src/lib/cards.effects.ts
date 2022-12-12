import { Injectable } from '@angular/core';
import { createEffect, ofType} from '@ngneat/effects';
import { cleanupPrivateData } from '@ul/shared';
import { tap } from 'rxjs/operators';
import { clearUserAndCardsData } from './cards.repository';

@Injectable({ providedIn: 'root' })
export class CardsEffects {

  cleanupPrivateData$ = createEffect(actions => actions.pipe(
    ofType(cleanupPrivateData),
    tap(clearUserAndCardsData),
  ));
}