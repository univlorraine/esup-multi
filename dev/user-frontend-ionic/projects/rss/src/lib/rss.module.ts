import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService, SharedComponentsModule, SharedPipeModule } from '@ul/shared';
import { RssPageRoutingModule } from './rss-routing.module';
import { RssPage } from './rss.page';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'rss',
    translation: true
  });
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RssPageRoutingModule,
    TranslateModule,
    SharedComponentsModule,
    SharedPipeModule
  ],
  declarations: [
    RssPage
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})
export class RssPageModule {
  static routerLink = '/rss';
}
