import { Component } from '@angular/core';
import { FeaturesService, MenuService, MenuItem } from '@ul/shared';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage {
  public featuresIsEmpty$: Observable<boolean>;
  public menuItems$: Observable<MenuItem[]>;
  public searchQuery$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private featuresService: FeaturesService,
    private menuService: MenuService,
  ) {
    const translatedServices$ = this.featuresService.translatedFeatures$.pipe(
      map(features => features.filter(feature => !feature.widget && feature.menu === 'service'))
    );
    this.featuresIsEmpty$ = translatedServices$.pipe(map(features => features.length === 0));
    this.menuItems$ = combineLatest([translatedServices$, this.searchQuery$])
      .pipe(
        // convert into translated features
        map(([features, searchQuery]) =>
          features.filter(feature => (
            feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feature.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feature.searchKeywords?.some((keyWord) => keyWord.toLowerCase().includes(searchQuery.toLowerCase()))
          ))
        ),
        // convert into menu items
        map(translatedFeatures => translatedFeatures.map(translatedFeature => this.menuService.convertTranslatedFeature(translatedFeature)))
    );
  }

  handleChange(event) {
    this.searchQuery$.next(event.target.value);
  }
}
