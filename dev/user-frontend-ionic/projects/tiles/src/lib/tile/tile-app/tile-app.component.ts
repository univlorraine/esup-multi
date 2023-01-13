import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatedApp } from '../../tiles.repository';

@Component({
selector: 'app-tile-app',
templateUrl: './tile-app.component.html',
styleUrls: ['./tile-app.component.scss'],
})
export class TileAppComponent {
    @Input() app: TranslatedApp;

    constructor(private router: Router) {}

    public onClick() {
        this.router.navigate([this.app.path]);
    }
}
