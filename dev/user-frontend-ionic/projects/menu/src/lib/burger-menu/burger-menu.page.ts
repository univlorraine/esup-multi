import { Component, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { MenuItem, MenuOpenerService,
  MenuService as SharedMenuService,  authenticatedUser$, setLanguage, AuthenticatedUser } from '@ul/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './burger-menu.page.html',
  styleUrls: ['./burger-menu.page.scss'],
})
export class BurgerMenuPage {

  public dynamicMenuItems$: Observable<MenuItem[]>;
  public staticMenuItems$: Observable<MenuItem[]>;
  public languages: Array<string> = [];
  authenticatedUser$: Observable<AuthenticatedUser>;

  constructor(
    @Inject('environment')
    private environment: any,
    private sharedMenuService: SharedMenuService,
    public menuOpenerService: MenuOpenerService
  ) {
    this.languages = this.environment.languages;
    this.authenticatedUser$ = authenticatedUser$;
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
