import { Module } from '@nestjs/common';
import { MailCalendarService } from './mail-calendar.service';
import { MailCalendarController } from './mail-calendar.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [MailCalendarService],
  controllers: [MailCalendarController],
})
export class MailCalendarModule {}
