import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ProjectModuleService } from '@ul/shared';
import { UnreadMailComponent } from './widget/unread-mail/unread-mail.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'unread-mail',
    translation: true,
    widgets: [{
      id: 'unread-mail',
      component: UnreadMailComponent,
    }]
  });

@NgModule({
  declarations: [UnreadMailComponent],
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
export class UnreadMailModule { }
