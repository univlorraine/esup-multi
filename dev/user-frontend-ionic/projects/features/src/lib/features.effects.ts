import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngneat/effects';
import { cleanupPrivateData, clearFeatures, FeaturesService, NetworkService } from '@ul/shared';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FeaturesEffects {

  cleanupPrivateData$ = createEffect(actions => actions.pipe(
    ofType(cleanupPrivateData),
    tap(clearFeatures),
    tap(async () =>  {
      // skip if network is not available
      if (!(await this.networkService.getConnectionStatus()).connected) {
        return;
      }

      this.featuresService.loadAndStoreFeatures().subscribe();
    })
  ));

  constructor(private featuresService: FeaturesService,
    private networkService: NetworkService,) {}

}
