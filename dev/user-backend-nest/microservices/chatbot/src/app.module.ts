import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatbotModule } from './chatbot/chatbot.module';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), ChatbotModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
