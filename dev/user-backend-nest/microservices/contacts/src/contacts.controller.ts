import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessagePattern } from '@nestjs/microservices';
import { ContactsService } from './contacts.service';
import { ContactQueryDto, Contact } from './contacts.dto';

@Controller()
export class ContactsController {
  constructor(private readonly appService: ContactsService) {}

  @MessagePattern({ cmd: 'contacts' })
  getContact(data: ContactQueryDto): Observable<Contact[]> {
    return this.appService.getContacts(data);
  }
}