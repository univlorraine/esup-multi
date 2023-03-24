import { Component, Input } from '@angular/core';
import { TranslatedTile } from '@ul/shared';

@Component({
selector: 'app-widget',
templateUrl: './widget.component.html',
styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent {
    @Input() tile: TranslatedTile;
}
