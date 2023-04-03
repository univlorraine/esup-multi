import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProjectModuleService, SharedComponentsModule } from '@ul/shared';
import {SocialNetworkComponent} from './widgets/social-network/social-network.component'


const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'social-network',
    widgets: [{
      id: 'social-network-widget',
      component: SocialNetworkComponent,
    }]
  });

@NgModule({
  declarations: [SocialNetworkComponent],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps: [ProjectModuleService],
    multi: true
  }],
  imports: [
    CommonModule,
    IonicModule,
    SharedComponentsModule
  ]
})
export class SocialNetworkModule { }
