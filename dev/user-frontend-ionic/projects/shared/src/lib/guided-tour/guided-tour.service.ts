/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { OrientationType, ScreenOrientation } from '@capawesome/capacitor-screen-orientation';
import { TranslateService } from '@ngx-translate/core';
import { ShepherdService } from 'angular-shepherd';
import { Observable, zip } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { userIsAuthenticated$ } from '../auth/authenticated-user.repository';
import { MenuItem } from '../navigation/menu.model';
import { NetworkService } from '../network/network.service';
import { anonymousSteps, loggedSteps } from '@multi/guided-tour';
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

    zip(
      this.isOnline$.pipe(
        filter(isOnline => isOnline),
        take(1),
        switchMap(() => userIsAuthenticated$.pipe(take(1))),
      ),
      this.translateService.get('GUIDED-TOUR') // on ne le récupère pas, mais permet d'attendre que la traduction soit chargée, sinon .instant() ne fonctionne pas à chaque fois
    ).subscribe(([userIsAuthenticated]) => {
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
