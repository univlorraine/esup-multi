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

import {
  AfterViewInit,
  Component,
  OnDestroy,
  DestroyRef,
  inject,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  FeaturesService,
  GuidedTourService,
  MenuItem,
  MenuItemLinkType,
  MenuItemRouterLink,
  MenuOpenerService,
  MenuService,
  NetworkService,
  Notification,
  NotificationsRepository,
  NotificationsService,
  PageLayout,
  StatisticsService,
  NavigationService,
  MultiTenantService,
} from '@multi/shared';
import { BehaviorSubject, combineLatestWith, Observable, Subscription, Subject } from 'rxjs';
import { distinctUntilChanged, filter, finalize, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {environment} from '../../environments/environment';

interface MenuItemWithOptionalRouterLink extends MenuItem {
  routerLink: string;
}

interface MenuItemWithBadge extends MenuItemWithOptionalRouterLink {
  hasBadge: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.page.html',
  styleUrls: ['../../theme/app-theme/styles/app/layout.page.scss']
})
export class LayoutPage implements AfterViewInit, OnChanges, OnDestroy {
  @Input() currentPageLayout: PageLayout;

  public isLoading = false;
  public tabsMenuItems$: Observable<MenuItemWithOptionalRouterLink[]>;
  public topMenuItemsWithBadges$: Observable<MenuItemWithBadge[]>;
  public isOnline$: Observable<boolean>;
  public menuItemHasBadgeState$: BehaviorSubject<boolean[]> = new BehaviorSubject<boolean[]>([]);
  public layoutChangeSubject$: Subject<string> = new Subject<string>();
  private destroyRef = inject(DestroyRef);
  public defaultLogo: string;
  private defaultLogoSubscription: Subscription;

  constructor(
    private navController: NavController,
    private menuService: MenuService,
    private featuresService: FeaturesService,
    private statisticsService: StatisticsService,
    private guidedTourService: GuidedTourService,
    public menuOpenerService: MenuOpenerService,
    private networkService: NetworkService,
    private notificationsRepository: NotificationsRepository,
    private notificationsService: NotificationsService,
    private multiTenantService: MultiTenantService,
    private navigationService: NavigationService
  ) {
    this.initializeObservables();
    this.setupSubscriptions();
    this.handleSingleTenant();
  }

  ngAfterViewInit() {
    this.loadFeatures();
  }

  ngOnDestroy() {
    this.defaultLogoSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentPageLayout) {
      this.layoutChangeSubject$.next(changes.currentPageLayout.currentValue);
    }
    if (this.shouldRefreshTabsViewData(changes)) {
      this.loadFeatures();
    }
  }

  private initializeObservables(): void {
    this.isOnline$ = this.networkService.isOnline$;
    this.tabsMenuItems$ = this.menuService.tabsMenuItems$.pipe(
      map(this.mapMenuItems)
    );

    this.topMenuItemsWithBadges$ = this.menuService.topMenuItems$.pipe(
      combineLatestWith(this.menuItemHasBadgeState$),
      map(([menuItems, badges]) => menuItems.map((menuItem, index) => ({
        ...menuItem,
        routerLink: menuItem.link.type === MenuItemLinkType.router
          ? (menuItem.link as MenuItemRouterLink).routerLink
          : undefined,
        hasBadge: badges[index] ?? false
      })))
    );

    // this.topMenuItems$ = this.menuService.topMenuItems$;
  }

  private mapMenuItems(menuItems: MenuItem[]): MenuItemWithOptionalRouterLink[] {
    return menuItems.map(menuItem => ({
      ...menuItem,
      routerLink: menuItem.link.type === MenuItemLinkType.router
        ? (menuItem.link as MenuItemRouterLink).routerLink
        : undefined
    }));
  }

  private setupSubscriptions(): void {
    this.topMenuItemsWithBadges$.pipe(
      distinctUntilChanged((prevMenuItems, currentMenuItems) => this.menuService.areSpecifiedPropertiesEqualsInMenuItemsArrays(
        prevMenuItems, currentMenuItems, ['link.routerLink']
      )),
      combineLatestWith(this.layoutChangeSubject$.pipe(filter(layout => layout === 'tabs'))),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.navigationService.setExternalNavigation(false);
      this.notificationsService.loadNotifications(0, 10).subscribe();
    });

    this.notificationsRepository.notifications$.pipe(
      takeUntilDestroyed(this.destroyRef),
      combineLatestWith(this.menuService.topMenuItems$),
      map(([notifications, menuItems]) => this.mapNotificationsToMenuItems(notifications, menuItems)),
    ).subscribe(values => {
      this.menuItemHasBadgeState$.next(values);
    });

    this.defaultLogo = environment.defaultLogo;
    this.defaultLogoSubscription = this.multiTenantService.currentTenantLogo$.subscribe(logo => {
      if(logo) {
        this.defaultLogo = logo;
      }
    });
  }

  private mapNotificationsToMenuItems(notifications: Notification[], menuItems: MenuItem[]): boolean[] {
    return menuItems.map(menuItem =>
      menuItem.link.type === MenuItemLinkType.router &&
      (menuItem.link as MenuItemRouterLink).routerLink === '/notifications' &&
      notifications.some(notification => notification.state === 'UNREAD')
    );
  }

  private shouldRefreshTabsViewData(changes: SimpleChanges): boolean {
    const currentPageLayoutChange = changes.currentPageLayout;
    return currentPageLayoutChange?.currentValue === 'tabs' && !currentPageLayoutChange.firstChange;
  }

  private async loadFeatures(): Promise<void> {
    // skip if network is not available
    if (!(await this.networkService.getConnectionStatus()).connected) {
      console.warn('No network connection available, features can not be loaded');
      return;
    }

    this.isLoading = true;
    this.featuresService.loadAndStoreFeatures().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  public async openExternalOrSsoLinkOnly(menuItem: MenuItem): Promise<boolean | void> {
    if (menuItem.link.type === MenuItemLinkType.router) {
      this.statisticsService.onFunctionalityOpened(menuItem.statisticName);
      this.navController.setDirection('forward', false);
      return;
    }

    return this.menuOpenerService.open(menuItem);
  }

  public generateMenuItemIdFromRouterLink(menuItem: MenuItemWithOptionalRouterLink) {
    return menuItem.routerLink?.substring(1).replace('/', '-');
  }

  public getMenuId(menuItem: MenuItem) {
    return this.guidedTourService.generateMenuItemIdFromTitle(menuItem);
  }

  private handleSingleTenant() {
    const availableTenants: any[] = this.multiTenantService.getAvailableTenants();
    const isGroup = availableTenants && availableTenants.length === 1 && availableTenants[0].isGroup === true;

    if (this.multiTenantService.isSingleTenant() && !isGroup) {
      this.multiTenantService.setCurrentTenantById(this.multiTenantService.getSelectedTenantId());
    }
  }
}
