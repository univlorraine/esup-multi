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

import { Component, Inject } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import {
  AuthenticatedUser, authenticatedUser$, isDarkTheme, isDarkTheme$, MenuItem, MenuOpenerService,
  MenuService as SharedMenuService, setIsDarkTheme, setLanguage, setUserHaveSetThemeInApp,
  WidgetLifecycleService, InfosService, GuidedTourService
} from '@multi/shared';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './burger-menu.page.html',
  styleUrls: ['../../../../../src/theme/app-theme/styles/menu/burger-menu.page.scss'],
})
export class BurgerMenuPage {
  public widgetIds = {
    auth: 'auth:auth-widget',
    contactUs: 'contact-us:contact-us-menu-item-widget',
    staticPages: 'static-pages:static-pages-widget',
    socialNetwork: 'social-network:social-network-widget'
  };
  public dynamicMenuItems$: Observable<MenuItem[]>;
  public staticMenuItems$: Observable<MenuItem[]>;
  public languages: Array<string> = [];
  appVersion$: Observable<string>;
  authenticatedUser$: Observable<AuthenticatedUser>;
  public darkModeEnabled: boolean;
  isDarkTheme$: Observable<boolean>;

  constructor(
    @Inject('environment')
    private environment: any,
    private sharedMenuService: SharedMenuService,
    private widgetLifecycleService: WidgetLifecycleService,
    private guidedTourService: GuidedTourService,
    public menuOpenerService: MenuOpenerService,
    public infosService: InfosService
  ) {
    this.languages = this.environment.languages;
    this.authenticatedUser$ = authenticatedUser$;
    this.staticMenuItems$ = this.sharedMenuService.burgerMenuItems$.pipe(
      map(menuItems => menuItems.filter(menuItem => menuItem.type === 'static'))
    );
    this.dynamicMenuItems$ = this.sharedMenuService.burgerMenuItems$.pipe(
      map(menuItems => menuItems.filter(menuItem => menuItem.type === 'dynamic'))
    );
    this.appVersion$ = !Capacitor.isNativePlatform()
      ? of(this.infosService.getAppVersion())
      : from(App.getInfo()).pipe(map(info => info.version));

    this.isDarkTheme$ = isDarkTheme$;
  }

  useLanguage(language: string): void {
    setLanguage(language);
  }

  toggleDarkMode() {
    this.darkModeEnabled = isDarkTheme();
    this.darkModeEnabled = !this.darkModeEnabled;
    setUserHaveSetThemeInApp(true);
    setIsDarkTheme(this.darkModeEnabled);
  }

  ionViewWillEnter() {
    this.widgetLifecycleService.sendWidgetViewWillEnter(Object.values(this.widgetIds));
  }

  ionViewDidEnter() {
    this.widgetLifecycleService.sendWidgetViewDidEnter(Object.values(this.widgetIds));
  }

  ionViewWillLeave() {
    this.widgetLifecycleService.sendWidgetViewWillLeave(Object.values(this.widgetIds));
  }

  ionViewDidLeave() {
    this.widgetLifecycleService.sendWidgetViewDidLeave(Object.values(this.widgetIds));
  }

  getMenuId(menuItem: MenuItem){
    return this.guidedTourService.generateMenuItemIdFromTitle(menuItem);
  }
}
