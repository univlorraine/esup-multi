import { Component, Input } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { SsoService } from '@ul/shared';
import { TranslatedInfo } from '../../../../tiles.repository';

@Component({
selector: 'app-service-info',
templateUrl: './service-info.component.html',
styleUrls: ['./service-info.component.scss'],
})
export class ServiceInfoComponent {
    @Input() info: TranslatedInfo;

    constructor(
        private ssoService: SsoService,
    ) {}

    public onClick(): Promise<void> {
        if (!this.info.link) {
        return;
        }

        if (!this.info.ssoService) {
        return Browser.open({ url: this.info.link });
        }

        this.ssoService.getSsoExternalLink({
            urlTemplate: this.info.link,
            service: this.info.ssoService
        })
        .subscribe(url => Browser.open({url }));
    }
}
