import { NgModule } from '@angular/core';
import { BackButtonComponent } from './back-button/back-button.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [BackButtonComponent],
    exports: [BackButtonComponent],
    imports: [
      CommonModule,
      IonicModule,
    ],
  })
  export class SharedComponentsModule {
  }
