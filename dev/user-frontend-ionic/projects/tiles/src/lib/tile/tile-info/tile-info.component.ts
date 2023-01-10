import { Component, Input } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { authenticatedUser$ } from '@ul/shared';
import { filter, first, switchMap } from 'rxjs/operators';
import { Info } from '../../tiles.repository';
import { TileInfoService } from './tile-info.service';

@Component({
selector: 'app-tile-info',
templateUrl: './tile-info.component.html',
styleUrls: ['./tile-info.component.scss'],
})
export class TileInfoComponent {
    @Input() info: Info;

    constructor(private tileInfoService: TileInfoService) {}

    public onClick(): Promise<void> {
        if (!this.info.link) {
        return;
        }

        if (!this.info.ssoService) {
        return Browser.open({ url: this.info.link });
        }

        authenticatedUser$.pipe(
        first(),
        filter(authenticatedUser => authenticatedUser != null),
        switchMap(authenticatedUser => this.tileInfoService.requestSsoServiceToken(this.info.ssoService, authenticatedUser.authToken))
        ).subscribe(serviceToken => {
        if (!serviceToken) {
            console.warn('No service token associated to url.');
            return;
        }

        return Browser.open({url: this.info.link.replace('{st}', serviceToken)});
        });
  }
}
