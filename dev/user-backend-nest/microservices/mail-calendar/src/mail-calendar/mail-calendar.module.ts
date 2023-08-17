import { Module } from '@nestjs/common';
import { MailCalendarService } from './mail-calendar.service';
import { MailCalendarController } from './mail-calendar.controller';
import { ConfigModule } from '@nestjs/config';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [ConfigModule, KeepaliveHttpModule],
  providers: [MailCalendarService],
  controllers: [MailCalendarController],
})
export class MailCalendarModule {}
