import { Injectable } from '@angular/core';
import { createEffect, ofType} from '@ngneat/effects';
import { FeaturesService, cleanupPrivateData } from '@ul/shared';
import { tap } from 'rxjs/operators';
import { clearFeatures } from '@ul/shared';
import { Network } from '@capacitor/network';

@Injectable({ providedIn: 'root' })
export class FeaturesEffects {

  cleanupPrivateData$ = createEffect(actions => actions.pipe(
    ofType(cleanupPrivateData),
    tap(clearFeatures),
    tap(async () =>  {
      // skip if network is not available
      if (!(await Network.getStatus()).connected) {
        return;
      }

      this.featuresService.loadAndStoreFeatures().subscribe();
    })
  ));

  constructor(private featuresService: FeaturesService) {}

}
