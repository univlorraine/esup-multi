import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProjectModuleService, SharedComponentsModule } from '@ul/shared';
import { StaticPageComponent } from './static-page/static-page.component';
import { StaticPagesRoutingModule } from './static-pages-routing.module';
import { StaticPagesWidgetComponent } from './widgets/static-pages-widget/static-pages-widget.component';


const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'static-pages',
    widgets: [{
      id: 'static-pages-widget',
      component: StaticPagesWidgetComponent,
    }]
  });

@NgModule({
  declarations: [
    StaticPageComponent,
    StaticPagesWidgetComponent
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps: [ProjectModuleService],
    multi: true
  }],
  imports: [
    CommonModule,
    IonicModule,
    StaticPagesRoutingModule,
    SharedComponentsModule,
  ]
})
export class StaticPagesModule {
  static routerLink = '/page';
}

