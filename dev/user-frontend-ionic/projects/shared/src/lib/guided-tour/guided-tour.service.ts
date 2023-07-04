import { Inject, Injectable } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import { isAnonymousTourViewed, isLoggedTourViewed, setAnonymousTourViewed, setLoggedTourViewed } from './guided-tour.repository';
import { Router } from '@angular/router';
import { anonymousSteps } from './config/anonymous-guided-tour.config';
import { TranslateService } from '@ngx-translate/core';
import { loggedSteps } from './config/logged-guided-tour.config';
import { userIsAuthenticated$ } from '../auth/authenticated-user.repository';
import { first } from 'rxjs/operators';
import { MenuItem } from '../navigation/menu.model';

@Injectable({
  providedIn: 'root'
})
export class GuidedTourService {

  constructor(
    @Inject('environment')
    private environment: any,
    private shepherdService: ShepherdService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.shepherdService.defaultStepOptions = {
      scrollTo: false,
      canClickTarget: false,
      showOn(): boolean {
        if(!this.attachTo) {
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
    if(!this.environment.guidedTourEnabled) {
      return;
    }

    userIsAuthenticated$.pipe(
      first()
    ).subscribe(userIsAuthenticated => {
      if(!isLoggedTourViewed() && !isAnonymousTourViewed() && !userIsAuthenticated){
        this.startAnonymousTour();
      } else if(!isLoggedTourViewed() && userIsAuthenticated) {
        this.startLoggedTour();
      }
    });
  }

  startAnonymousTour() {
    const stepsConfig = anonymousSteps(this.router, this.translateService, setAnonymousTourViewed);
    this.shepherdService.addSteps(stepsConfig);
    this.shepherdService.start();
  }

  startLoggedTour() {
    const stepsConfig = loggedSteps(this.router, this.translateService, setLoggedTourViewed);
    this.shepherdService.addSteps(stepsConfig);
    this.shepherdService.start();
  }

  generateMenuItemIdFromTitle(menuItem: MenuItem){
    if(!menuItem.title) {
      return;
    }
    return menuItem.title.replace(/\./g, '-').toLowerCase();
  }
}
