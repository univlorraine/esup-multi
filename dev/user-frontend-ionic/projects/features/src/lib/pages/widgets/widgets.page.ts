import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {first, map} from 'rxjs/operators';
import { TranslatedFeature, FeaturesService, WidgetLifecycleService } from '@ul/shared';

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
    private widgetLifecycleService: WidgetLifecycleService,
  ) {
    this.translatedFeatures$ = this.featuresService.translatedFeatures$.pipe(
      map(features => features.filter(t => t.widget))
    );
    this.featuresIsEmpty$ = this.translatedFeatures$.pipe(map(features => features.length === 0));
  }

  ionViewWillEnter() {
    this.translatedFeatures$.pipe(
      first(),
    ).subscribe(features => {
      this.widgetLifecycleService.sendWidgetViewWillEnter(features.map(feature => feature.widget));
    });
  }

  ionViewDidEnter() {
    this.translatedFeatures$.pipe(
      first(),
    ).subscribe(features => {
      this.widgetLifecycleService.sendWidgetViewDidEnter(features.map(feature => feature.widget));
    });
  }

  ionViewWillLeave() {
    this.translatedFeatures$.pipe(
      first(),
    ).subscribe(features => {
      this.widgetLifecycleService.sendWidgetViewWillLeave(features.map(feature => feature.widget));
    });
  }

  ionViewDidLeave() {
    this.translatedFeatures$.pipe(
      first(),
    ).subscribe(features => {
      this.widgetLifecycleService.sendWidgetViewDidLeave(features.map(feature => feature.widget));
    });
  }
}
