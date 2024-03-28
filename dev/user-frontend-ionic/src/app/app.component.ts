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
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import { App } from '@capacitor/app';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Badge } from '@capawesome/capacitor-badge';
import { ModalController, Platform, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {
  currentLanguage$, features$, FeaturesService, isDarkTheme$, isFeatureStoreInitialized$, NavigationService,
  NotificationsService, NetworkService, PageLayout, PageLayoutService, setIsDarkTheme, themeRepoInitialized$,
  userHadSetThemeInApp, userHadSetThemeInApp$
} from '@multi/shared';
import { initializeApp } from 'firebase/app';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
  private featuresIsEmpty$: Observable<boolean>;
  private subscriptions: Subscription[] = [];
  private backButtonListener: Promise<PluginListenerHandle>;
  private appResumeListener: Promise<PluginListenerHandle>;

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
    private notificationsService: NotificationsService
  ) {
    currentLanguage$.subscribe((language) => {
      document.documentElement.lang = language || environment.defaultLanguage;
    });

    this.featuresIsEmpty$ = features$.pipe(
      map((val) => val.length === 0)
    );

    this.isNothingToShow$ = isFeatureStoreInitialized$.pipe(
      switchMap(isInitialized => {
        if (isInitialized) {
          return combineLatest([
            this.featuresIsEmpty$,
            this.networkService.isOnline$
          ]);
        } else {
          return of([null, null]);
        }
      }),
      switchMap(([featuresIsEmpty, isOnline]) => {
        const nothingToShowButLoadFeatures = featuresIsEmpty && isOnline;
        const isNothingToShow = (featuresIsEmpty === true || featuresIsEmpty === null) && (isOnline === false || isOnline === null);

        if (nothingToShowButLoadFeatures) {
          return this.featuresService.loadAndStoreFeatures().pipe(
            map(() => true)
          );
        } else {
          return of(isNothingToShow);
        }
      }));

    this.isNothingToShow$.subscribe();

    SplashScreen.show({
      showDuration: 1500,
      autoHide: true,
      fadeInDuration: 500
    });

    // Define available languages in app
    this.languages = this.environment.languages;
    this.translateService.addLangs(this.languages);

    this.currentPageLayout$ = this.pageLayoutService.currentPageLayout$;

    this.platform.ready().then(() => {
      if (!Capacitor.isNativePlatform()) {
        return;
      }

      StatusBar.setStyle({ style: Style.Dark });
    });
  }

  ngOnInit() {
    this.backButtonListener = App.addListener('backButton', () => {
      this.popoverController.getTop().then(popover => {
        if (popover) {
          popover.dismiss();
          return;
        }
        this.modalController.getTop().then(modal => {
          if (modal) {
            modal.dismiss();
            return;
          }
          this.navigationService.navigateBack();
        });
      });
    });

    // reload notifications when app is resumed (back to foreground)
    this.appResumeListener = App.addListener('resume', () => {
      this.notificationsService.loadNotifications(0, 10).subscribe();
    });

    // apply language saved in persistent state
    this.subscriptions.push(currentLanguage$
      .subscribe(language => this.translateService.use(language || this.environment.defaultLanguage))
    );

    // apply theme saved in persistent state or if is not in the system setting of the user's device
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.removeEventListener('change', (mediaQuery) => this.toggleOSDarkTheme(mediaQuery.matches));
    // Listen for changes to the prefers-color-scheme media query (from system setting of the user)
    prefersDark.addEventListener('change', (mediaQuery) => this.toggleOSDarkTheme(mediaQuery.matches));

    themeRepoInitialized$.pipe(
      switchMap(isInitialized => isInitialized ? combineLatest([isDarkTheme$, userHadSetThemeInApp$])
        : of(null)),
    ).subscribe(([isDarkTheme, userHadSetThemeInApplication]) => {
      if (userHadSetThemeInApplication === false && prefersDark.matches) {
        isDarkTheme = true;
        setIsDarkTheme(true);
      }

      if (userHadSetThemeInApplication === false && !prefersDark.matches) {
        isDarkTheme = false;
        setIsDarkTheme(false);
      }

      this.toggleDarkTheme(isDarkTheme);
    });

    this.initializeFirebase();
    this.handleBadge();
  }

  toggleDarkTheme(isDarkTheme: boolean): void {
    const body = document.body;
    if (isDarkTheme) {
      this.renderer.addClass(body, 'dark');
    } else {
      this.renderer.removeClass(body, 'dark');
    }
  }

  toggleOSDarkTheme(shouldAdd) {
    if (!userHadSetThemeInApp()) {
      setIsDarkTheme(shouldAdd);
      this.toggleDarkTheme(shouldAdd);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.backButtonListener.then((listener) => {
      listener.remove();
    });
    this.appResumeListener.then((listener) => {
      listener.remove();
    });
  }

  public async initializeFirebase(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      return;
    }
    initializeApp(this.environment.firebase);
  }

  /**
   * On iOs, the badge for the number of notification that is on the app icon is not well updated when the notifications
   * are read / deleted from the notification center, this function is used to fix that, by synchronizing the badge
   * with the number of notifications in notification center
   */
  private async handleBadge(): Promise<void> {
    const isIos = (await Device.getInfo()).platform === 'ios';
    const notSupported = !(await Badge.isSupported());
    if (notSupported || !isIos) { // The badge is already well handled on android, no need to do it manually
      return;
    }

    // Will be called when the user launches the app, then each time the app enters or exits background
    const fixBadgeCount = async () => {
      const notificationList = await FirebaseMessaging.getDeliveredNotifications();
      return Badge.set({
        count: notificationList.notifications.length
      });
    };

    this.subscriptions.push(this.platform.pause.subscribe(async () => {
      await fixBadgeCount();
    }));

    this.subscriptions.push(this.platform.resume.subscribe(async () => {
      await fixBadgeCount();
    }));

    await fixBadgeCount();
  }
}
