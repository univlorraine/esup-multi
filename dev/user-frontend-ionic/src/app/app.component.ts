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

import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject, Inject, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import { App } from '@capacitor/app';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Badge } from '@capawesome/capacitor-badge';
import { IonRouterOutlet, ModalController, Platform, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {
  currentLanguage$, features$, FeaturesService, isDarkTheme$, isFeatureStoreInitialized$, NavigationService,
  NotificationsService, NetworkService, PageLayout, PageLayoutService, setIsDarkTheme, StatisticsService,
  themeRepoInitialized$, userHadSetThemeInApp, userHadSetThemeInApp$
} from '@multi/shared';
import { initializeApp } from 'firebase/app';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['../theme/app-theme/styles/app/app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public languages: Array<string> = [];
  public currentPageLayout$: Observable<PageLayout>;
  public isOnline$: Observable<boolean>;
  public isNothingToShow$: Observable<boolean>;
  private backButtonSubscription: Subscription;
  private appResumeListener: Promise<PluginListenerHandle>;
  private destroyRef = inject(DestroyRef);
  private prefersDark: MediaQueryList;

  constructor(
    @Inject('environment')
    private environment: any,
    private platform: Platform,
    private translateService: TranslateService,
    private pageLayoutService: PageLayoutService,
    private navigationService: NavigationService,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private networkService: NetworkService,
    private featuresService: FeaturesService,
    private notificationsService: NotificationsService,
    private statisticsService: StatisticsService,
    private titleService: Title,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.titleService.setTitle(this.environment.appTitle);
    this.initializeBackButton();
    this.initializeAppResume();
    this.initializeTheme();
    this.handleBadge();

    if (!Capacitor.isNativePlatform()) {
      this.initializeFirebase();
    }
  }

  ngOnDestroy(): void {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
    this.appResumeListener.then((listener) => listener.remove());
    this.prefersDark.removeEventListener('change', this.handleColorSchemeChange);
  }

  private initializeBackButton(): void {
    this.platform.ready().then(() => {
      this.backButtonSubscription = this.platform.backButton
        .subscribeWithPriority(-1, this.handleBackButton.bind(this));
    });
  }

  private async handleBackButton(): Promise<void> {
    const popover = await this.popoverController.getTop();
    if (popover) {
      await popover.dismiss();
      return;
    }
    const modal = await this.modalController.getTop();
    if (modal) {
      await modal.dismiss();
      return;
    }
    if(!this.navigationService.canGoBack()) {
      App.minimizeApp();
      return;
    }
    this.navigationService.navigateBack();
  }

  private initializeAppResume(): void {
    // reload notifications when app is resumed (back to foreground)
    this.appResumeListener = App.addListener('resume', () => {
      this.notificationsService.loadNotifications(0, 10).subscribe();
    });
  }

  private initializeTheme(): void {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.prefersDark.addEventListener('change', this.handleColorSchemeChange);

    themeRepoInitialized$.pipe(
      filter((isInitialized: boolean) => isInitialized),
      switchMap(() => combineLatest([isDarkTheme$, userHadSetThemeInApp$])),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(([isDarkTheme, userHadSetThemeInApplication]) => {
      if (!userHadSetThemeInApplication) {
        isDarkTheme = this.prefersDark.matches;
        setIsDarkTheme(isDarkTheme);
      }
      this.toggleDarkTheme(isDarkTheme);
    });
  }

  private handleColorSchemeChange(mediaQuery: MediaQueryListEvent): void {
    if (!userHadSetThemeInApp()) {
      const shouldAdd = mediaQuery.matches;
      setIsDarkTheme(shouldAdd);
      this.toggleDarkTheme(shouldAdd);
    }
  }

  private toggleDarkTheme(isDarkTheme: boolean): void {
    this.renderer[isDarkTheme ? 'addClass' : 'removeClass'](document.body, 'dark');
  }

  private initializeApp(): void {
    this.initializeLanguage();
    this.initializeEmptyStateDetection();
    this.initializePageLayout();
    this.initializeSplashScreen();
    this.initializeStatusBar();
    this.statisticsService.checkAndGenerateStatsUid();
  }

  private initializeLanguage(): void {
    // Charge les langues disponibles à partir du paramètre 'language' dans le fichier d'environnement
    this.languages = this.environment.languages;
    this.translateService.addLangs(this.languages);
    // Observable permettant de mettre à jour le code language dans l'entête html et d'appliquer la langue choisie
    currentLanguage$.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(language => {
      // Mise à jour du langage dans l'application et dans l'attribut lang de l'élément HTML
      this.translateService.use(language || this.environment.defaultLanguage);
      this.document.documentElement.lang = language || this.environment.defaultLanguage;
    });
  }

  private initializeEmptyStateDetection(): void {
    const featuresIsEmpty$ : Observable<boolean> = features$.pipe(map(val => val.length === 0));
    this.isNothingToShow$ = isFeatureStoreInitialized$.pipe(
      filter((isInitialized: boolean) => isInitialized),
      switchMap(() => combineLatest([featuresIsEmpty$, this.networkService.isOnline$])),
      switchMap(([featuresIsEmpty, isOnline]) => {
        if (featuresIsEmpty && isOnline) {
          return this.featuresService.loadAndStoreFeatures().pipe(map(() => false));
        }
        return of(featuresIsEmpty || !isOnline);
      }),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    );
    this.isNothingToShow$.subscribe();
  }

  private initializePageLayout(): void {
    this.currentPageLayout$ = this.pageLayoutService.currentPageLayout$;
  }

  private initializeSplashScreen(): void {
    SplashScreen.show({
      showDuration: 1500,
      autoHide: true,
      fadeInDuration: 500
    });
  }

  private initializeStatusBar(): void {
    if (!Capacitor.isNativePlatform()) {
      return;
    }
    this.platform.ready().then(() => {
      StatusBar.setStyle({ style: Style.Dark });
    });
  }

  public async initializeFirebase(): Promise<void> {
    try {
      initializeApp(this.environment.firebase);
    } catch (error) {
      console.error('Error initializing Firebase:', error);
    }
  }

  /**
   * On iOs, the badge for the number of notification that is on the app icon is not well updated when the notifications
   * are read / deleted from the notification center, this function is used to fix that, by synchronizing the badge
   * with the number of notifications in notification center
   */
  private async handleBadge(): Promise<void> {
    const deviceInfo = await Device.getInfo();
    if (deviceInfo.platform !== 'ios' || !(await Badge.isSupported())) {
      return;
    }

    const fixBadgeCount = async () => {
      const notificationList = await FirebaseMessaging.getDeliveredNotifications();
      return Badge.set({ count: notificationList.notifications.length });
    };

    this.platform.pause.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(fixBadgeCount);
    this.platform.resume.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(fixBadgeCount);

    await fixBadgeCount();
  }
}
