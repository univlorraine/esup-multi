import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ShepherdService } from 'angular-shepherd';
import { Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { userIsAuthenticated$ } from '../auth/authenticated-user.repository';
import { MenuItem } from '../navigation/menu.model';
import { NetworkService } from '../network/network.service';
import { anonymousSteps } from './config/anonymous-guided-tour.config';
import { loggedSteps } from './config/logged-guided-tour.config';
import { isAnonymousTourViewed, isLoggedTourViewed, setAnonymousTourViewed, setLoggedTourViewed } from './guided-tour.repository';
import { ScreenOrientation, OrientationType } from '@capawesome/capacitor-screen-orientation';

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
    private networkService: NetworkService
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
        first(),
        switchMap(() => userIsAuthenticated$.pipe(first()))
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
    await ScreenOrientation.lock({type: OrientationType.PORTRAIT});
    const onCompleteFn = () => {
      setAnonymousTourViewed();
      ScreenOrientation.unlock();
    };
    const stepsConfig = anonymousSteps(this.router, this.translateService, onCompleteFn);
    this.shepherdService.addSteps(stepsConfig);
    this.shepherdService.start();
  }

  async startLoggedTour() {
    await ScreenOrientation.lock({type: OrientationType.PORTRAIT});
    const onCompleteFn = () => {
      setLoggedTourViewed();
      ScreenOrientation.unlock();
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
