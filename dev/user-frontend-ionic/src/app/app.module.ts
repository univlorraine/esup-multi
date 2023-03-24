import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '@ul/auth';
import { CardsPageModule } from '@ul/cards';
import { ClockingModule } from '@ul/clocking';
import { ContactsModule } from '@ul/contacts';
import { ImportantNewsModule } from '@ul/important-news';
import { MapModule } from '@ul/map';
import { MenuModule } from '@ul/menu';
import { NotificationsModule } from '@ul/notifications';
import { PreferencesPageModule } from '@ul/preferences';
import { ReservationModule } from '@ul/reservation';
import { RssPageModule } from '@ul/rss';
import { ScheduleModule } from '@ul/schedule';
import { ProjectModuleService, translationsLoaderFactory } from '@ul/shared';
import { StaticPagesModule } from '@ul/static-pages';
import { TilesModule } from '@ul/tiles';
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
        longitude: 48.69137200828818,
        latitude: 6.183309429175067
      }
    }),
    RssPageModule,
    CardsPageModule,
    ScheduleModule.forRoot({
      nextEventsWidget: {
        numberOfEventsLimit: 2,
        numberOfDaysLimit: 7
      },
      previousWeeksInCache: 1,
      nextWeeksInCache: 2
    }),
    ImportantNewsModule,
    TilesModule,
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
    StaticPagesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translationsLoaderFactory,
        deps: [HttpClient, ProjectModuleService]
      }
    }),
  ],
  providers: [
    { provide: 'environment', useValue: environment },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
