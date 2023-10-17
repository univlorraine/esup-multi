import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatomoModule } from 'ngx-matomo';
import { AuthModule } from '@ul/auth';
import { CalendarModule } from '@ul/calendar';
import { CardsPageModule } from '@ul/cards';
import { ChatbotModule } from '@ul/chatbot';
import { ClockingModule } from '@ul/clocking';
import { ContactUsModule } from '@ul/contact-us';
import { ContactsModule } from '@ul/contacts';
import { FeaturesModule } from '@ul/features';
import { ImportantNewsModule } from '@ul/important-news';
import { MapModule } from '@ul/map';
import { MenuModule } from '@ul/menu';
import { NotificationsModule } from '@ul/notifications';
import { PreferencesPageModule } from '@ul/preferences';
import { ReservationModule } from '@ul/reservation';
import { RestaurantsModule } from '@ul/restaurants';
import { RssPageModule } from '@ul/rss';
import { ScheduleModule } from '@ul/schedule';
import { AuthInterceptor, ProjectModuleService, translationsLoaderFactory } from '@ul/shared';
import { SocialNetworkModule } from '@ul/social-network';
import { StaticPagesModule } from '@ul/static-pages';
import { UnreadMailModule } from '@ul/unread-mail';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorModule } from './error/error.module';
import { PageLayoutsModule } from './page-layouts/page-layouts.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      platform: {
        desktop: (win) => {
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(win.navigator.userAgent);
          return !isMobile;
        }
      },
    }),
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ErrorModule,
    PageLayoutsModule,
    PreferencesPageModule,
    AuthModule,
    MapModule.forRoot({
      defaultMapLocation: {
        longitude: 6.183309429175067,
        latitude: 48.69137200828818
      }
    }),
    RssPageModule,
    CardsPageModule.forRoot({
      knownErrors: ['NO_PHOTO', 'NO_ACTIVE_CARD', 'UNPAID_FEES']
    }),
    ScheduleModule.forRoot({
      nextEventsWidget: {
        numberOfEventsLimit: 2,
        numberOfDaysLimit: 7
      },
      previousWeeksInCache: 1,
      nextWeeksInCache: 2,
      managerRoles: ['schedule-manager', 'multi-admin']
    }),
    ImportantNewsModule,
    FeaturesModule,
    ContactsModule.forRoot({
      contactTypes: ['STUDENT', 'STAFF', 'STANDIN']
    }),
    NotificationsModule.forRoot({
      numberOfNotificationsOnFirstLoad: 20,
      numberOfNotificationsToLoadOnScroll: 10
    }),
    ClockingModule,
    ReservationModule.forRoot({
      reservationSsoServiceName: 'https://resa-espace.univ-lorraine.fr/reservationsalles/Authentification.aspx',
      reservationSsoUrlTemplate: 'https://resa-espace.univ-lorraine.fr/reservationsalles/Authentification.aspx?ticket={st}',
    }),
    MenuModule,
    ChatbotModule.forRoot({
      chatbotLogoRegex: /_ully5/i
    }),
    StaticPagesModule,
    ContactUsModule,
    RestaurantsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translationsLoaderFactory,
        deps: [HttpClient, ProjectModuleService]
      }
    }),
    SocialNetworkModule,
    UnreadMailModule,
    CalendarModule.forRoot({
      numberOfEventsLimit: 3
    }),
    MatomoModule.forRoot({
      scriptUrl: 'https://webstats.univ-lorraine.fr/matomo.js',
      trackers: [
        {
          trackerUrl: 'https://webstats.univ-lorraine.fr/matomo.php',
          siteId: 453
        }
      ],
      routeTracking: {
        enable: true
      }
    })
  ],
  providers: [
    { provide: 'environment', useValue: environment },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
