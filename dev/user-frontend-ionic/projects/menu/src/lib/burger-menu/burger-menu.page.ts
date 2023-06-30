import { Component, Inject } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import {
  AuthenticatedUser, authenticatedUser$, isDarkTheme, isDarkTheme$, MenuItem, MenuOpenerService,
  MenuService as SharedMenuService, setIsDarkTheme, setLanguage, setUserHaveSetThemeInApp,
  WidgetLifecycleService, InfosService, GuidedTourService
} from '@ul/shared';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './burger-menu.page.html',
  styleUrls: ['./burger-menu.page.scss'],
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
