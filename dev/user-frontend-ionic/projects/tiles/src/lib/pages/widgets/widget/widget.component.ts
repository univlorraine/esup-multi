import { Component, Input } from '@angular/core';
import { TranslatedTile } from '../../../tiles.repository';

@Component({
selector: 'app-widget',
templateUrl: './widget.component.html',
styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent {
    @Input() tile: TranslatedTile;
}
