import { Component, Input } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { getAuthToken } from '@ul/shared';
import { filter, first, switchMap } from 'rxjs/operators';
import { TranslatedInfo } from '../../tiles.repository';
import { TileInfoService } from './tile-info.service';

@Component({
selector: 'app-tile-info',
templateUrl: './tile-info.component.html',
styleUrls: ['./tile-info.component.scss'],
})
export class TileInfoComponent {
    @Input() info: TranslatedInfo;

    constructor(private tileInfoService: TileInfoService) {}

    public onClick(): Promise<void> {
        if (!this.info.link) {
        return;
        }

        if (!this.info.ssoService) {
        return Browser.open({ url: this.info.link });
        }

        getAuthToken().pipe(
            first(),
            filter(authToken => authToken != null),
            switchMap(authToken => this.tileInfoService.requestSsoServiceToken(this.info.ssoService, authToken))
        ).subscribe(serviceToken => {
            if (!serviceToken) {
                console.warn('No service token associated to url.');
                return;
            }

            return Browser.open({url: this.info.link.replace('{st}', serviceToken)});
        });
  }
}
