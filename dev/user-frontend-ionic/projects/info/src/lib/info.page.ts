import { Component } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Network } from '@capacitor/network';
import { authenticatedUser$ } from '@ul/shared';
import { finalize, filter, first, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Info, infoList$, setInfoList } from './info.repository';
import { InfoService } from './info.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage {
  public infoList$: Observable<Info[]> = infoList$;
  public infoListIsEmpty$: Observable<boolean>;
  public isLoading = false;

  constructor(
    private infoService: InfoService,
  ) {
    this.infoListIsEmpty$ = this.infoList$.pipe(map(infoList => infoList.length === 0));
  }

  ionViewWillEnter() {
    this.loadInfoList();
  }

  public onClick(info: Info): Promise<void> {
    if (!info.link) {
      return;
    }

    if (!info.ssoService) {
      return Browser.open({ url: info.link });
    }

    authenticatedUser$.pipe(
      first(),
      filter(authenticatedUser => authenticatedUser != null),
      switchMap(authenticatedUser => this.infoService.requestSsoServiceToken(info.ssoService, authenticatedUser.authToken))
    ).subscribe(serviceToken => {
      if (!serviceToken) {
        console.warn('No service token associated to url.');
        return;
      }

      return Browser.open({url: info.link.replace('{st}', serviceToken)});
    });
  }

  private async loadInfoList(): Promise<void> {
    // skip if network is not available
    if (!(await Network.getStatus()).connected) {
      return;
    }

    this.isLoading = true;
    this.infoService.getInfoList()
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(infoList => setInfoList(infoList));
  }
}
