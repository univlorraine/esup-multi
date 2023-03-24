import { NgModule } from '@angular/core';
import { BackButtonComponent } from './back-button/back-button.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
      BackButtonComponent,
      HeaderComponent,
    ],
    exports: [
      BackButtonComponent,
      HeaderComponent,
    ],
    imports: [
      CommonModule,
      IonicModule,
      TranslateModule,
    ],
  })
  export class SharedComponentsModule {
  }
