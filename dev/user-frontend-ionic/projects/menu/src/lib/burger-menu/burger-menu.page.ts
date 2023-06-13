import { Component, Inject, } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { MenuItem, MenuOpenerService, MenuService as SharedMenuService, setLanguage, authenticatedUser$,
  AuthenticatedUser, WidgetLifecycleService } from '@ul/shared';
import { Observable, from, of } from 'rxjs';
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

  constructor(
    @Inject('environment')
    private environment: any,
    private sharedMenuService: SharedMenuService,
    private widgetLifecycleService: WidgetLifecycleService,
    public menuOpenerService: MenuOpenerService,
  ) {
    this.languages = this.environment.languages;
    this.authenticatedUser$ = authenticatedUser$;
    this.staticMenuItems$ = this.sharedMenuService.burgerMenuItems$.pipe(
      map(menuItems => menuItems.filter(menuItem => menuItem.type === 'static'))
    );
    this.dynamicMenuItems$ = this.sharedMenuService.burgerMenuItems$.pipe(
      map(menuItems => menuItems.filter(menuItem => menuItem.type === 'dynamic'))
    );
    this.appVersion$ = !Capacitor.isNativePlatform() ? of(null) : from(App.getInfo()).pipe(map(info => info.version));
  }

  useLanguage(language: string): void {
    setLanguage(language);
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
}
