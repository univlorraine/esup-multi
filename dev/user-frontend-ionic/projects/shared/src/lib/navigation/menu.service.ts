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

import { Injectable } from '@angular/core';
import { isMatch, pick } from 'lodash';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeatureType } from '../features/features.repository';
import { FeaturesService, TranslatedExternalFeature, TranslatedFeature, TranslatedInternalFeature } from '../features/features.service';
import { ProjectModuleService } from '../project-module/project-module.service';
import { StaticMenuItem, StaticMenuType } from '../project-module/static-menu.service';
import { MenuItem, MenuItemLink, MenuItemLinkType, ServiceMenuItem } from './menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public tabsMenuItems$ = new ReplaySubject<MenuItem[]>();
  public topMenuItems$ = new BehaviorSubject<MenuItem[]>([]);
  public burgerMenuItems$ = new BehaviorSubject<MenuItem[]>([]);
  public allMenuItems$ = new BehaviorSubject<MenuItem[]>([]);
  private allStaticMenuItems: MenuItem[];
  private tabsStaticMenuItemsStart: MenuItem[];
  private tabsStaticMenuItemsEnd: MenuItem[];
  private burgerStaticMenuItems: MenuItem[];

  constructor(
    private projectModuleService: ProjectModuleService,
    private featuresService: FeaturesService,
  ) {
    this.allStaticMenuItems = this.getStaticMenuItems();
    this.tabsStaticMenuItemsStart = this.getStaticMenuItemsByType('tabs:start');
    this.tabsStaticMenuItemsEnd = this.getStaticMenuItemsByType('tabs:end');
    this.burgerStaticMenuItems = this.getStaticMenuItemsByType('burger');

    // all menu items are a merge between static (from modules) and dynamic (from CMS) menu items
    this.featuresService.translatedFeatures$.pipe(
      map(features => features.filter(feature => feature.menu && !feature.widget)),
      map(features => features.map((app: TranslatedFeature) => this.convertTranslatedFeature(app))),
      map((dynamicMenuItems: MenuItem[]) => [
        ...this.allStaticMenuItems,
        ...dynamicMenuItems,
      ])
    ).subscribe(this.allMenuItems$);

    // burger menu items are a merge between static (from modules) and dynamic (from CMS) menu items
    this.featuresService.translatedFeatures$.pipe(
      map(features => features.filter(feature => feature.menu === 'burger' && !feature.widget)),
      map(features => features.map((app: TranslatedFeature) => this.convertTranslatedFeature(app))),
      map((dynamicMenuItems: MenuItem[]) => [
        ...this.burgerStaticMenuItems,
        ...dynamicMenuItems,
      ])
    ).subscribe(this.burgerMenuItems$);

    // tabs menu items are a merge between static (from modules) and dynamic (from CMS) menu items
    this.featuresService.translatedFeatures$.pipe(
      map(features => features.filter(feature => feature.menu === 'tabs' && !feature.widget)),
      map(features => features.map((app: TranslatedFeature) => this.convertTranslatedFeature(app))),
      map((dynamicMenuItems: MenuItem[]) => [
        ...this.tabsStaticMenuItemsStart,
        ...dynamicMenuItems,
        ...this.tabsStaticMenuItemsEnd,
      ])
    ).subscribe(this.tabsMenuItems$);

    // top menu items are fully dynamic (from CMS)
    this.featuresService.translatedFeatures$.pipe(
      map(features => features.filter(feature => feature.menu === 'top' && !feature.widget)),
      map(features => features.map((app: TranslatedFeature) => this.convertTranslatedFeature(app)))
    ).subscribe(this.topMenuItems$);
  }

  public convertTranslatedFeature(feature: TranslatedFeature): ServiceMenuItem {
    switch (feature.type) {
      case FeatureType.internal:
        return this.convertTranslatedInternalFeature(feature);
      case FeatureType.external:
        return this.convertTranslatedExternalFeature(feature);
    }
  }

  // Used in distinctUntilChanged() on the menuItemsTabs$ observable to compare specific properties of two arrays of menu items.
  public areSpecifiedPropertiesEqualsInMenuItemsArrays(
    firstMenuItems: MenuItem[],
    secondMenuItems: MenuItem[],
    propertiesToCompare: string[]
  ): boolean {
    return firstMenuItems.length === secondMenuItems.length &&
    isMatch(firstMenuItems, pick(secondMenuItems, [propertiesToCompare]));
  }

  private getStaticMenuItemsByType(menuType: StaticMenuType): MenuItem[] {
    return this.projectModuleService.getStaticMenuItemsByType(menuType)
      .map(menuItem => this.convertStaticMenuItem(menuItem));
  }

  private getStaticMenuItems(): MenuItem[] {
    return this.projectModuleService.getStaticMenuItems()
      .map(menuItem => this.convertStaticMenuItem(menuItem));
  }

  private convertStaticMenuItem(staticMenuItem: StaticMenuItem): MenuItem {
    return {
      icon: staticMenuItem.icon,
      title: staticMenuItem.title,
      shortTitle: staticMenuItem.shortTitle,
      link: {
        type: MenuItemLinkType.router,
        routerLink: staticMenuItem.routerLink
      },
      type: 'static'
    };
  }

  private convertTranslatedInternalFeature(app: TranslatedInternalFeature): ServiceMenuItem {
    return {
      ...app,
      icon: app.icon,
      iconSourceSvgLightTheme: app.iconSourceSvgLightTheme,
      iconSourceSvgDarkTheme: app.iconSourceSvgDarkTheme,
      title: app.title,
      shortTitle: app.shortTitle,
      link: {
        type: MenuItemLinkType.router,
        routerLink: app.routerLink
      },
      type: 'dynamic'
    };
  }


  private convertTranslatedExternalFeature(app: TranslatedExternalFeature): ServiceMenuItem {
    const link: MenuItemLink = (app.ssoService) ?
      {
        type: MenuItemLinkType.sso,
        urlTemplate: app.link,
        service: app.ssoService
      } :
      {
        type: MenuItemLinkType.external,
        url: app.link
      };

    return {
      ...app,
      icon: app.icon,
      iconSourceSvgLightTheme: app.iconSourceSvgLightTheme,
      iconSourceSvgDarkTheme: app.iconSourceSvgDarkTheme,
      title: app.title,
      shortTitle: app.shortTitle,
      link,
      type: 'dynamic',
    };
  }
}
