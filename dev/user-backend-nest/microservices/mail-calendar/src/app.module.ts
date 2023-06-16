import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailCalendarModule } from './mail-calendar/mail-calendar.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MailCalendarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
