import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsNgModule } from '@ngneat/effects-ng';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthEffects } from './auth.effects';
import { AuthPage } from './auth.page';
import { ConnectedPage } from './connected/connected.page';
import { LoginPage } from './login/login.page';
import { PreferencesComponent } from './preferences/preferences.component';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'auth',
    translation: true,
    menuItems: [{
      title: 'AUTH.MENU',
      icon: 'log-in',
      position: 999,
      routerLink: AuthModule.routerLink,
      type: 'burger'
    }],
    preferencesComponent: PreferencesComponent
  });
@NgModule({
  declarations: [
    LoginPage,
    ConnectedPage,
    PreferencesComponent,
    AuthPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
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
