import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService, SharedComponentsModule } from '@ul/shared';
import { ChatbotRoutingModule } from './chatbot-routing.module';
import { ChatbotPage } from './chatbot.page';
import { CHATBOT_CONFIG, ChatbotModuleConfig } from './chatbot.config';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'chatbot',
    translation: true
  });

@NgModule({
  declarations: [
    ChatbotPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    ChatbotRoutingModule,
    SharedComponentsModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})
export class ChatbotModule {
  static path = '/chatbot';

  static forRoot(config: ChatbotModuleConfig): ModuleWithProviders<ChatbotModule> {
    return {
      ngModule: ChatbotModule,
      providers: [
        { provide: CHATBOT_CONFIG, useValue: config }
      ]
    };
  }
}
