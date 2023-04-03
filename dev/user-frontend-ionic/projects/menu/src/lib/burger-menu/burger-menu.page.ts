import { Component, Inject } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Network } from '@capacitor/network';
import { MenuItem, MenuOpenerService, MenuService as SharedMenuService, setLanguage } from '@ul/shared';
import { Observable } from 'rxjs';
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

  constructor(
    @Inject('environment')
    private environment: any,
    private sharedMenuService: SharedMenuService,
    public menuOpenerService: MenuOpenerService,
  ) {
    this.languages = this.environment.languages;
    this.staticMenuItems$ = this.sharedMenuService.burgerMenuItems$.pipe(
      map(menuItems => menuItems.filter(menuItem => menuItem.type === 'static'))
    );
    this.dynamicMenuItems$ = this.sharedMenuService.burgerMenuItems$.pipe(
      map(menuItems => menuItems.filter(menuItem => menuItem.type === 'dynamic'))
    );
  }

  useLanguage(language: string): void {
    setLanguage(language);
  }

}
