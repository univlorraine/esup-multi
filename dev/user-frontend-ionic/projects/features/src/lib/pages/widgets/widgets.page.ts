import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslatedFeature, FeaturesService } from '@ul/shared';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.page.html',
  styleUrls: ['./widgets.page.scss'],
})
export class WidgetsPage {
  public featuresIsEmpty$: Observable<boolean>;
  public translatedFeatures$: Observable<TranslatedFeature[]>;

  constructor(
    private featuresService: FeaturesService,
  ) {
    this.translatedFeatures$ = this.featuresService.translatedFeatures$.pipe(
      map(features => features.filter(t => t.widget))
    );
    this.featuresIsEmpty$ = this.translatedFeatures$.pipe(map(features => features.length === 0));
  }

}
