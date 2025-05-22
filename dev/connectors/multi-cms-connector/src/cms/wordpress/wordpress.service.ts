import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CmsConfigError, CmsQueryError } from '../cms.exception';

@Injectable()
export class WordpressService {
  private readonly logger = new Logger(WordpressService.name);
  private readonly apiUrl: string;
  private readonly apiUsername: string;
  private readonly apiPassword: string;
  private readonly timeout: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const cmsConfig = this.configService.get('cms');
    if (!cmsConfig) {
      throw new CmsConfigError('Missing required WordPress configuration');
    }

    this.apiUrl = `${cmsConfig.apiUrl}/graphql`;
    this.apiUsername = cmsConfig.apiUsername;
    this.apiPassword = cmsConfig.apiPassword;
    this.timeout = cmsConfig.timeout || 5000;

    this.logger.log('WordPress service initialized successfully');
  }

  async executeGraphQLQuery(query: string): Promise<any> {
    this.logger.debug(`Executing GraphQL query`);

    try {
      const credentials = Buffer.from(
        `${this.apiUsername}:${this.apiPassword}`,
      ).toString('base64');

      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          { query },
          {
            headers: { Authorization: `Basic ${credentials}` },
            timeout: this.timeout,
          },
        ),
      );

      this.logger.debug('Query executed successfully');
      return response.data.data;
    } catch (error) {
      throw new CmsQueryError('Failed to fetch data from WordPress', error);
    }
  }
}
