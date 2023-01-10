import { Component, Input } from '@angular/core';
import { Tile } from '../tiles.repository';

@Component({
selector: 'app-tile',
templateUrl: './tile.component.html',
styleUrls: ['./tile.component.scss'],
})
export class TileComponent {
    @Input() tile: Tile;
}
