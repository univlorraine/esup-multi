import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatedInternalFeature, StatisticsService } from '@ul/shared';

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
    ) {}

    public onClick() {
      this.statisticsService.onFunctionalityOpened(this.feature.statisticName);
      this.router.navigateByUrl(this.feature.routerLink);
    }
}
