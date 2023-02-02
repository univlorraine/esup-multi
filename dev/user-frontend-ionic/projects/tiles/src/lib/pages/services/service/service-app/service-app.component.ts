import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatedApp } from '../../../../tiles.repository';

@Component({
selector: 'app-service-app',
templateUrl: './service-app.component.html',
styleUrls: ['./service-app.component.scss'],
})
export class ServiceAppComponent {
    @Input() app: TranslatedApp;

    constructor(
        private router: Router,
    ) {}

    public onClick() {
        this.router.navigate([this.app.path]);
    }
}
