import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatedInternalFeature } from '@ul/shared';

@Component({
selector: 'app-widget-internal-feature',
templateUrl: './widget-internal-feature.component.html',
styleUrls: ['./widget-internal-feature.component.scss'],
})
export class WidgetInternalFeatureComponent {
    @Input() feature: TranslatedInternalFeature;

    constructor(
        private router: Router,
    ) {}

    public onClick() {
        this.router.navigateByUrl(this.feature.routerLink);
    }
}
