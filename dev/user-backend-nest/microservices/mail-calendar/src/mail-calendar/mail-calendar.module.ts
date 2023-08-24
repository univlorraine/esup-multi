import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailCalendarService } from './mail-calendar.service';
import { MailCalendarController } from './mail-calendar.controller';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [ConfigModule, KeepaliveHttpModule, CacheModule.register()],
  providers: [MailCalendarService],
  controllers: [MailCalendarController],
})
export class MailCalendarModule {}
