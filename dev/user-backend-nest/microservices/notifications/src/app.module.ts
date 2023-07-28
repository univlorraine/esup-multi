import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MonitoringModule } from './monitoring/monitoring.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    NotificationsModule,
    MonitoringModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
