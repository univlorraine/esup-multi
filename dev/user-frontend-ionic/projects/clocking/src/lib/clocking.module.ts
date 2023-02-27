import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { ClockingComponent } from './widgets/clocking/clocking.component';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'clocking',
    translation: true,
    widgets: [{
      id: 'clocking',
      component: ClockingComponent,
    }]
  });

@NgModule({
  declarations: [ClockingComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})
export class ClockingModule { }
