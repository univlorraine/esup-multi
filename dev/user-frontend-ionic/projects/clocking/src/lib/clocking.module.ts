import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsNgModule } from '@ngneat/effects-ng';
import { ProjectModuleService } from '@ul/shared';
import { ClockingComponent } from './widgets/clocking/clocking.component';
import { ClockingEffects } from './clocking.effects';

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
    EffectsNgModule.forFeature([ClockingEffects]),
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})
export class ClockingModule { }
