import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { AuthRoutingModule } from './auth-routing.module';
import { ConnectedPage } from './connected/connected.page';
import { LoginPage } from './login/login.page';
import { PreferencesComponent } from './preferences/preferences.component';



@NgModule({
  declarations: [
    LoginPage,
    ConnectedPage,
    PreferencesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class AuthModule {
  static path = 'auth';

  constructor(private projectModuleService: ProjectModuleService) {
    this.projectModuleService.initProjectModule({
      name: 'auth',
      translation: true,
      menuItem: {
        title: 'AUTH.MENU',
        icon: 'log-in',
        position: 999,
        path: AuthModule.path
      },
      preferencesComponent: PreferencesComponent
    });
  }
}
