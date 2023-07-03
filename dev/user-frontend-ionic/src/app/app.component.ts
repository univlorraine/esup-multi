import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import {
  currentLanguage$, isDarkTheme$, PageLayout, PageLayoutService, setIsDarkTheme,
  themeRepoInitialized$, userHadSetThemeInApp, userHadSetThemeInApp$, NavigationService
} from '@ul/shared';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { initializeApp } from 'firebase/app';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { PluginListenerHandle } from '@capacitor/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  public languages: Array<string> = [];
  public currentPageLayout$: Observable<PageLayout>;
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
    @Inject(DOCUMENT) private document: Document
  ) {

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

      StatusBar.setStyle({style: Style.Dark});
    });
  }

  ngOnInit() {
    this.backButtonListener = App.addListener('backButton', () => {
      this.popoverController.getTop().then(popover => {
        if(popover) {
          popover.dismiss();
          return;
        }
        this.modalController.getTop().then(modal => {
          if(modal) {
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
