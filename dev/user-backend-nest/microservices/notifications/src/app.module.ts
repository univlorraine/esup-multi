import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
