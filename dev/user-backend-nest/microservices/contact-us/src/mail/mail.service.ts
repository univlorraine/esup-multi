import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Observable, catchError, concatMap, firstValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { DirectusApi } from '../config/configuration.interface';
import { ContactUsSettingsDto, SendMailQueryDto } from './mail.dto';
import { RpcException } from '@nestjs/microservices';
import { DirectusResponse } from '../common/common.dto';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private directusApiConfig: DirectusApi;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.directusApiConfig = this.configService.get<DirectusApi>('directusApi');
  }

  public async sendMail(query: SendMailQueryDto) {
    const userDataString = Object.entries(query.userData)
      .map(
        ([key, value]) =>
          `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`,
      )
      .join('\n');
    query.text += `\n\n[User information]\n${userDataString}`;

    const sendMail$ = this.getContactUsSettings().pipe(
      concatMap((contactUsSettings) => {
        const { to } = contactUsSettings;
        return this.mailerService.sendMail({
          ...query,
          to,
        });
      }),
    );

    await firstValueFrom(sendMail$);
  }

  public getContactUsSettings(): Observable<ContactUsSettingsDto> {
    const url = `${this.directusApiConfig.url}/items/contact_us`;
    const requestConfig = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.directusApiConfig.bearerToken}`,
      },
    };

    return this.httpService
      .get<DirectusResponse<ContactUsSettingsDto>>(url, requestConfig)
      .pipe(
        catchError((err: any) => {
          const errorMessage = 'Unable to get directus contact-us';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => res.data.data),
      );
  }
}
