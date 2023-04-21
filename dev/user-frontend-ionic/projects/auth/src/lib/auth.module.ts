import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsNgModule } from '@ngneat/effects-ng';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService, SharedComponentsModule } from '@ul/shared';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthEffects } from './auth.effects';
import { LoginPage } from './login/login.page';
import { PreferencesComponent } from './preferences/preferences.component';
import { AuthComponent } from './widget/auth/auth.component';
import { NotAuthentifiedComponent } from './widget/not-authentified/not-authentified.component';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'auth',
    translation: true,
    widgets: [{
      id: 'auth-widget',
      component: AuthComponent
    }, {
      id: 'auth-not-authentified-widget',
      component: NotAuthentifiedComponent
    }],
    preferencesComponent: PreferencesComponent
  });
@NgModule({
  declarations: [
    LoginPage,
    PreferencesComponent,
    AuthComponent,
    NotAuthentifiedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedComponentsModule,
    EffectsNgModule.forFeature([AuthEffects]),
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})
export class AuthModule {
  static routerLink = '/auth';
}
