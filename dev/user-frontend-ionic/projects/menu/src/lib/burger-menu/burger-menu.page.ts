import { Component, Inject } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Network } from '@capacitor/network';
import { MenuItem, MenuOpenerService, MenuService as SharedMenuService, updateLanguage } from '@ul/shared';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MenuService } from '../menu.service';
import { SocialNetwork, socialNetworks$ } from '../social-network.repository';

@Component({
  selector: 'app-menu',
  templateUrl: './burger-menu.page.html',
  styleUrls: ['./burger-menu.page.scss'],
})
export class BurgerMenuPage {

  public dynamicMenuItems$: Observable<MenuItem[]>;
  public staticMenuItems$: Observable<MenuItem[]>;
  public languages: Array<string> = [];
  public socialNetworks$: Observable<SocialNetwork[]> = socialNetworks$;

  constructor(
    @Inject('environment')
    private environment: any,
    private sharedMenuService: SharedMenuService,
    private menuService: MenuService,
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

  async ionViewWillEnter() {
    if (!(await Network.getStatus()).connected) {
      return;
    }
    this.menuService.loadAndStoreSocialNetworks()
      .pipe(first()).subscribe();
  }

  useLanguage(language: string): void {
    updateLanguage(language);
  }

  async openExternalLink(link: string) {
    await Browser.open({ url: link });
  }
}
