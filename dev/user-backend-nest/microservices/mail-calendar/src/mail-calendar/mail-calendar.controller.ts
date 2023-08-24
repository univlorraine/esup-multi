import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import {
  MailCalendarQueryDto,
  MailCalendarReplyDto,
} from './mail-calendar.dto';
import { MailCalendarService } from './mail-calendar.service';

@Controller()
export class MailCalendarController {
  constructor(
    private mailCalendarService: MailCalendarService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @MessagePattern({ cmd: 'mailCalendar' })
  async getMailCalendar(
    query: MailCalendarQueryDto,
  ): Promise<MailCalendarReplyDto> {
    const cacheKey = `mail-calendar-${JSON.stringify(query)}`;
    const cachedMailCalendar =
      await this.cacheManager.get<MailCalendarReplyDto>(cacheKey);

    if (cachedMailCalendar !== undefined) {
      return cachedMailCalendar;
    }

    const mailCalendar = await firstValueFrom(
      this.mailCalendarService.getMailCalendar(query),
    );

    const ttl = this.configService.get<number>('cacheTtl') || 300;
    await this.cacheManager.set(cacheKey, mailCalendar, ttl);

    return mailCalendar;
  }
}
