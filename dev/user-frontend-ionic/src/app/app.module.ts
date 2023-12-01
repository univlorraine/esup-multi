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
