import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addMenuItem } from '@ul/shared';
import { AuthRoutingModule } from './auth-routing.module';
import { ConnectedPage } from './connected/connected.page';
import { LoginPage } from './login/login.page';



@NgModule({
  declarations: [
    LoginPage,
    ConnectedPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
  static PATH = 'auth';

  constructor() {
    addMenuItem({
      title: 'Connexion',
      icon: 'log-in',
      position: 999,
      path: AuthModule.PATH
    })
  }
}
