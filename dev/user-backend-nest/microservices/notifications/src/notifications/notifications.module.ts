import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [ConfigModule, KeepaliveHttpModule],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
