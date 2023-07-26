import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Contact, ContactQueryDto } from './contacts.dto';
import { ContactsService } from './contacts.service';

@Controller()
export class ContactsController {
  constructor(private readonly appService: ContactsService) {}

  @MessagePattern({ cmd: 'contacts' })
  getContact(data: ContactQueryDto): Observable<Contact[]> {
    return this.appService.getContacts(data);
  }
}
