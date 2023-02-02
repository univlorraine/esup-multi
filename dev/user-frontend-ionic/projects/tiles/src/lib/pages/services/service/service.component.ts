import { Component, Input } from '@angular/core';
import { TranslatedTile } from '../../../tiles.repository';

@Component({
selector: 'app-service',
templateUrl: './service.component.html',
styleUrls: ['./service.component.scss'],
})
export class ServiceComponent {
    @Input() tile: TranslatedTile;
}
