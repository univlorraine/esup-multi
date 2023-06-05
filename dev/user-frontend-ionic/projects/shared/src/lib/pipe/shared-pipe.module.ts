import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CompleteLocalDatePipe } from './complete-local-date-pipe';
import { RelativeTimePipe } from './relative-time-pipe';
import { TruncatePipe } from './truncate-pipe';

@NgModule({
  declarations: [
    RelativeTimePipe,
    TruncatePipe,
    CompleteLocalDatePipe
  ],
  exports: [
    RelativeTimePipe,
    TruncatePipe,
    CompleteLocalDatePipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
})
export class SharedPipeModule {
}
