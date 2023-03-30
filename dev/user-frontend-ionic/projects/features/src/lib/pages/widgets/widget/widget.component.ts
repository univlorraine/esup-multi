import { Component, Input } from '@angular/core';
import { TranslatedFeature } from '@ul/shared';

@Component({
selector: 'app-feature-widget',
templateUrl: './widget.component.html',
styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent {
    @Input() feature: TranslatedFeature;
}
