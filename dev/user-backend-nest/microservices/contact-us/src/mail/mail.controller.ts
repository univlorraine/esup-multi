import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { MessagePattern } from '@nestjs/microservices';
import { SendMailQueryDto } from './mail.dto';
import { Observable, from } from 'rxjs';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern({ cmd: 'contactUs' })
  contactUsByMail(query: SendMailQueryDto): Observable<void> {
    return from(this.mailService.sendMail(query));
  }
}
