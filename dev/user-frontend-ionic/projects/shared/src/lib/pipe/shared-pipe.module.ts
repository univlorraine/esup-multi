import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RelativeTimePipe } from './relative-time-pipe';

@NgModule({
  declarations: [
    RelativeTimePipe],
  exports: [
    RelativeTimePipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
})
export class SharedPipeModule {
}
