import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MailCalendarModule } from './mail-calendar/mail-calendar.module';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MailCalendarModule,
    MonitoringModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
