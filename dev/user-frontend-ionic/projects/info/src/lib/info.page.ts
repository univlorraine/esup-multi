import { Component } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Network } from '@capacitor/network';
import { authenticatedUser$ } from '@ul/shared';
import { finalize, filter, first, map, switchMap } from 'rxjs/operators';
import { Observable, Subscription, zip } from 'rxjs';
import { Info, infoList$, setInfoList } from './info.repository';
import { InfoService } from './info.service';
import { currentLanguage$ } from '@ul/shared';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage {
  public infoList$: Observable<Info[]> = infoList$;
  public infoListIsEmpty$: Observable<boolean>;
  public isLoading = false;
  private currentLanguageSubcription: Subscription;

  constructor(
    private infoService: InfoService,
  ) {
    this.infoListIsEmpty$ = this.infoList$.pipe(map(infoList => infoList.length === 0));
  }

  ionViewWillEnter() {
    this.currentLanguageSubcription = currentLanguage$
      .subscribe(lang => this.loadInfoList(lang));
  }

  ionViewWillLeave() {
    this.currentLanguageSubcription?.unsubscribe();
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

  private async loadInfoList(lang: string): Promise<void> {
    // skip if network is not available
    if (!(await Network.getStatus()).connected) {
      return;
    }

    this.isLoading = true;
    zip(currentLanguage$, authenticatedUser$).pipe(
      first(),
      switchMap(([currentLanguage, authenticatedUser]) => this.infoService.getInfoList(currentLanguage, authenticatedUser?.authToken)),
      finalize(() => this.isLoading = false)
    ).subscribe(infoList => setInfoList(infoList));
  }
}
