import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { OrientationType, ScreenOrientation } from '@capawesome/capacitor-screen-orientation';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ShepherdService } from 'angular-shepherd';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { userIsAuthenticated$ } from '../auth/authenticated-user.repository';
import { MenuItem } from '../navigation/menu.model';
import { NetworkService } from '../network/network.service';
import { anonymousSteps } from './config/anonymous-guided-tour.config';
import { loggedSteps } from './config/logged-guided-tour.config';
import { isAnonymousTourViewed, isLoggedTourViewed, setAnonymousTourViewed, setLoggedTourViewed } from './guided-tour.repository';

@Injectable({
  providedIn: 'root'
})
export class GuidedTourService {

  private isOnline$: Observable<boolean>;

  constructor(
    @Inject('environment')
    private environment: any,
    private shepherdService: ShepherdService,
    private router: Router,
    private translateService: TranslateService,
    private networkService: NetworkService,
    private platform: Platform
  ) {
    this.isOnline$ = this.networkService.isOnline$;

    this.shepherdService.defaultStepOptions = {
      scrollTo: false,
      canClickTarget: false,
      showOn(): boolean {
        if (!this.attachTo) {
          return true;
        }
        //If attachTo element is not present, the step is skipped
        const element = this.attachTo && document.querySelector(this.attachTo.element);
        return !!element;
      },
    };

    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
  }

  startGlobalTour() {
    if (!this.environment.guidedTourEnabled) {
      return;
    }

    this.isOnline$
      .pipe(
        filter(isOnline => isOnline),
        take(1),
        switchMap(() => userIsAuthenticated$.pipe(take(1)))
      )
      .subscribe(userIsAuthenticated => {
        if (
          !isLoggedTourViewed() &&
          !isAnonymousTourViewed() &&
          !userIsAuthenticated
        ) {
          this.startAnonymousTour();
        } else if (!isLoggedTourViewed() && userIsAuthenticated) {
          this.startLoggedTour();
        }
      });
  }

  async startAnonymousTour() {

    if (Capacitor.isNativePlatform()) { await ScreenOrientation.lock({ type: OrientationType.PORTRAIT }); }

    const onCompleteFn = () => {
      setAnonymousTourViewed();
      if (Capacitor.isNativePlatform()) { ScreenOrientation.unlock(); }
    };
    const stepsConfig = anonymousSteps(this.router, this.translateService, onCompleteFn);
    this.shepherdService.addSteps(stepsConfig);
    this.shepherdService.start();
  }

  async startLoggedTour() {

    if (Capacitor.isNativePlatform()) { await ScreenOrientation.lock({ type: OrientationType.PORTRAIT }); }

    const onCompleteFn = () => {
      setLoggedTourViewed();
      if (Capacitor.isNativePlatform()) { ScreenOrientation.unlock(); }
    };
    const stepsConfig = loggedSteps(this.router, this.translateService, onCompleteFn);
    this.shepherdService.addSteps(stepsConfig);
    this.shepherdService.start();
  }

  generateMenuItemIdFromTitle(menuItem: MenuItem) {
    if (!menuItem.title) {
      return;
    }
    return menuItem.title.replace(/\./g, '-').toLowerCase();
  }
}
