import { Component, Input } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { SsoService, TranslatedExternalFeature, StatisticsService } from '@ul/shared';

@Component({
selector: 'app-widget-external-feature',
templateUrl: './widget-external-feature.component.html',
styleUrls: ['./widget-external-feature.component.scss'],
})
export class WidgetExternalFeatureComponent {
    @Input() feature: TranslatedExternalFeature;

    constructor(
        private ssoService: SsoService,
        private statisticsService: StatisticsService,
    ) {}

    public onClick(): Promise<void> {
        if (!this.feature.link) {
          return;
        }

        this.statisticsService.onFunctionalityOpened(this.feature.statisticName);

        if (!this.feature.ssoService) {
          return Browser.open({ url: this.feature.link });
        }

        this.ssoService.getSsoExternalLink({
          urlTemplate: this.feature.link,
          service: this.feature.ssoService
        })
        .subscribe(url => Browser.open({ url }));
  }
}
