import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { ErrorModule } from './error/error.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { ProjectModuleService, translationsLoaderFactory } from '@ul/shared';
import { InfoPageModule } from '@ul/info';
import { PreferencesPageModule } from '@ul/preferences';
import { AuthModule } from '@ul/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    ErrorModule,
    InfoPageModule,
    PreferencesPageModule,
    AuthModule,
    TranslateModule.forRoot({
        defaultLanguage: 'fr',
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
export class AppModule {}
