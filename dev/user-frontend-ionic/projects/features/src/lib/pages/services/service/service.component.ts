import { Component, Input } from '@angular/core';
import { MenuItem, MenuOpenerService } from '@ul/shared';

@Component({
selector: 'app-service',
templateUrl: './service.component.html',
styleUrls: ['./service.component.scss'],
})
export class ServiceComponent {
    @Input() menuItem: MenuItem;

    constructor(
        public menuOpenerService: MenuOpenerService
    ) {}
}
