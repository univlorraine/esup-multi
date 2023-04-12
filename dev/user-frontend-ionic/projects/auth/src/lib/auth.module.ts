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

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'auth',
    translation: true,
    widgets: [{
      id: 'auth-widget',
      component: AuthComponent
    }],
    preferencesComponent: PreferencesComponent
  });
@NgModule({
  declarations: [
    LoginPage,
    PreferencesComponent,
    AuthComponent
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
