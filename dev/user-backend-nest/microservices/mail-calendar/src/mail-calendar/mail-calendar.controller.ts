import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  MailCalendarQueryDto,
  MailCalendarReplyDto,
} from './mail-calendar.dto';
import { MailCalendarService } from './mail-calendar.service';

@Controller()
export class MailCalendarController {
  constructor(private mailCalendarService: MailCalendarService) {}

  @MessagePattern({ cmd: 'mailCalendar' })
  getMailCalendar(
    query: MailCalendarQueryDto,
  ): Observable<MailCalendarReplyDto> {
    return this.mailCalendarService.getMailCalendar(query);
  }
}
