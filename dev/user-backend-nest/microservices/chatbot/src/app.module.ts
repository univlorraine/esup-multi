import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatbotModule } from './chatbot/chatbot.module';
import configuration from './config/configuration';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    ChatbotModule,
    MonitoringModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
