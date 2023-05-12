import { Injectable } from '@angular/core';
import { TranslatedFeature } from '@ul/shared';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor() { }

  sortFeaturesByUserOrder(features: TranslatedFeature[], userOrder: string[]): TranslatedFeature[] {

    return features
      .sort((a, b) => {
        const orderA = userOrder.indexOf(a.id);
        const orderB = userOrder.indexOf(b.id);
        if (orderA !== -1 && orderB !== -1) {
          return orderA - orderB;
        } else if (orderA !== -1) {
          return orderA === 0 ? -1 : 1;
        } else {
          // isNew features are first with next line
          return -1;
        }
      })
      .map((feature) => feature);
  }

  sortFeaturesWithIsNewsFirst(features: TranslatedFeature[]): TranslatedFeature[] {
    return features
      .sort((a, b) => {
        if (a.isNew && !b.isNew) {
          return -1;
        } else if (!a.isNew && b.isNew) {
          return 1;
        } else {
          return 1;
        }
      })
      .map((feature) => feature);
  }

  searchQueryFilter(features: TranslatedFeature[], searchQuery: string): TranslatedFeature[] {
    const query = searchQuery.toLowerCase();
    return features.filter(feature => (
      feature.title.toLowerCase().includes(query) ||
      feature.content?.toLowerCase().includes(query) ||
      feature.searchKeywords?.some(keyword => keyword.toLowerCase().includes(query))
    ));
  }
}
