import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UlApi } from '../config/configuration.interfaces';
import { Contact, ContactQueryDto } from './contacts.dto';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);
  private ulApiConfig: UlApi;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.ulApiConfig = this.configService.get<UlApi>('ulApi');
  }
  getContacts(contact: ContactQueryDto): Observable<Contact[]> {
    const url = this.ulApiConfig.userProfileUrl;
    return this.httpService
      .post<Contact[]>(`${url}`, contact, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
        },
      })
      .pipe(
        catchError((err) => {
          const errorMessage = `Unable to get contacts`;
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => res.data),
      );
  }
}
