import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BackButtonComponent } from './back-button/back-button.component';
import { HeaderComponent } from './header/header.component';
import { WidgetComponent } from './widgets/widget.component';
import { CustomIconComponent } from './custom-icon/custom-icon.component';

@NgModule({
  declarations: [
    BackButtonComponent,
    CustomIconComponent,
    HeaderComponent,
    WidgetComponent],
  exports: [
    BackButtonComponent,
    CustomIconComponent,
    WidgetComponent,
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
