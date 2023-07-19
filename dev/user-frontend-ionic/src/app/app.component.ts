import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { ModalController, Platform, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {
  currentLanguage$, features$, FeaturesService, isFeatureStoreInitialized$,
  isDarkTheme$, NavigationService, NetworkService, PageLayout, PageLayoutService, setIsDarkTheme,
  themeRepoInitialized$, userHadSetThemeInApp, userHadSetThemeInApp$
} from '@ul/shared';
import { initializeApp } from 'firebase/app';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  public languages: Array<string> = [];
  public currentPageLayout$: Observable<PageLayout>;
  public isOnline$: Observable<boolean>;
  public isNothingToShow$: Observable<boolean>;
  private featuresIsEmpty$: Observable<boolean>;
  private subscriptions: Subscription[] = [];
  private backButtonListener: Promise<PluginListenerHandle>;

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

  ) {

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
        } else{
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
  }

  public async initializeFirebase(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      return;
    }
    initializeApp(this.environment.firebase);
  }
}
