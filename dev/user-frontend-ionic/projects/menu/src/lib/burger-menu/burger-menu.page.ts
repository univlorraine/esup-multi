import { Component, Inject } from '@angular/core';
import { ProjectModuleService, updateLanguage } from '@ul/shared';
import { SocialNetwork } from './social-network.repository';
import { MenuService } from './menu.service';
import { Browser } from '@capacitor/browser';
import { first, switchMap } from 'rxjs/operators';
import { Network } from '@capacitor/network';
import { socialNetworks$ ,setSocialNetworks } from './social-network.repository';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './burger-menu.page.html',
  styleUrls: ['./burger-menu.page.scss'],
})
export class BurgerMenuPage {

  public menuItems;
  public languages: Array<string> = [];
  public socialNetworks$: Observable<SocialNetwork[]> = socialNetworks$;

  constructor(
    @Inject('environment')
    private environment: any,
    private projectModuleService: ProjectModuleService,
    private menuModuleService: MenuService,
  ) {
    this.languages = this.environment.languages;
    this.menuItems = this.projectModuleService.getMenuItemsByType('burger');
  }

  async ionViewWillEnter() {
    if (!(await Network.getStatus()).connected) {
      return;
    }
    this.menuModuleService.getSocialNetworks()
    .pipe(first()
    ).subscribe(socials => {
      setSocialNetworks(socials);
    });
  }

  useLanguage(language: string): void {
    updateLanguage(language);
  }

  async openExternalLink(link: string) {
    await Browser.open({ url: link });
  }
}
