import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addMenuItem, PreferencesService } from '@ul/shared';
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
    ReactiveFormsModule
  ]
})
export class AuthModule {
  static path = 'auth';

  constructor(private preferencesService: PreferencesService) {
    addMenuItem({
      title: 'Connexion',
      icon: 'log-in',
      position: 999,
      path: AuthModule.path
    });

    this.preferencesService.addPreferencesComponent({
      component: PreferencesComponent
    });
  }
}
