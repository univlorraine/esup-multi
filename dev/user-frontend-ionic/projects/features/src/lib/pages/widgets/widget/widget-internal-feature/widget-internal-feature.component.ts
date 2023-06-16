import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticsService, ThemeService, TranslatedInternalFeature } from '@ul/shared';

@Component({
  selector: 'app-widget-internal-feature',
  templateUrl: './widget-internal-feature.component.html',
  styleUrls: ['./widget-internal-feature.component.scss'],
})
export class WidgetInternalFeatureComponent {
  @Input() feature: TranslatedInternalFeature;

  constructor(
    private router: Router,
    private statisticsService: StatisticsService,
    private themeService: ThemeService
  ) { }

  public onClick() {
    this.statisticsService.onFunctionalityOpened(this.feature.statisticName);
    this.router.navigateByUrl(this.feature.routerLink);
  }

  fontColor(backgroundColor) {
    return this.themeService.isBackgroundFromCmsDarkOrIsDarkTheme(backgroundColor) ?
      'light-font-color' : 'dark-font-color';
  }
}
