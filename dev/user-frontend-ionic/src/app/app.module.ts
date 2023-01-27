import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '@ul/auth';
import { CardsPageModule } from '@ul/cards';
import { MapModule } from '@ul/map';
import { PreferencesPageModule } from '@ul/preferences';
import { RssPageModule } from '@ul/rss';
import { ScheduleModule } from '@ul/schedule';
import { ProjectModuleService, translationsLoaderFactory } from '@ul/shared';
import { TilesModule } from '@ul/tiles';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorModule } from './error/error.module';

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
    PreferencesPageModule,
    AuthModule,
    MapModule,
    RssPageModule,
    CardsPageModule,
    ScheduleModule.forRoot({
      nextEventsWidget: {
        numberOfEventsLimit: 2,
        numberOfDaysLimit: 7
      }
    }),
    TilesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translationsLoaderFactory,
        deps: [HttpClient, ProjectModuleService]
      }
    })
  ],
  providers: [
    { provide: 'environment', useValue: environment },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
