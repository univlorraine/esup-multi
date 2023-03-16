import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { ImportantNewsComponent } from './widgets/important-news/important-news.component';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'important-news',
    translation: true,
    widgets: [{
      id: 'important-news',
      component: ImportantNewsComponent,
    }]
  });

@NgModule({
  declarations: [ImportantNewsComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps: [ProjectModuleService],
    multi: true
  }],
})
export class ImportantNewsModule {
  static routerLink = '/important-news';
 }
