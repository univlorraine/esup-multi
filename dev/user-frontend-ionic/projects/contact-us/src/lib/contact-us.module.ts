import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService, SharedComponentsModule } from '@ul/shared';
import { ContactUsMenuItemComponent } from './widgets/contact-us-menu-item/contact-us-menu-item.component';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsPage } from './contact-us.page';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'contact-us',
    translation: true,
    widgets: [{
      id: 'contact-us-menu-item-widget',
      component: ContactUsMenuItemComponent,
    }]
  });


@NgModule({
  declarations: [
    ContactUsMenuItemComponent,
    ContactUsPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    ContactUsRoutingModule,
    TranslateModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})
export class ContactUsModule { }
