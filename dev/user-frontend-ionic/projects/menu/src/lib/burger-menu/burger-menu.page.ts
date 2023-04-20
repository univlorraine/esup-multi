import { Component, Inject, } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { MenuItem, MenuOpenerService, MenuService as SharedMenuService,
  setLanguage, authenticatedUser$, AuthenticatedUser } from '@ul/shared';
import { Observable, from, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './burger-menu.page.html',
  styleUrls: ['./burger-menu.page.scss'],
})
export class BurgerMenuPage {

  public dynamicMenuItems$: Observable<MenuItem[]>;
  public staticMenuItems$: Observable<MenuItem[]>;
  public languages: Array<string> = [];
  appVersion$: Observable<string>;
  authenticatedUser$: Observable<AuthenticatedUser>;

  constructor(
    @Inject('environment')
    private environment: any,
    private sharedMenuService: SharedMenuService,
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
}
