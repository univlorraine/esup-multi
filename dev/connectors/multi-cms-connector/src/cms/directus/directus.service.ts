import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CmsConfigError, CmsQueryError } from '../cms.exception';

@Injectable()
export class DirectusService {
  private readonly logger = new Logger(DirectusService.name);
  private readonly apiUrl: string;
  private readonly apiToken: string;
  private readonly timeout: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const cmsConfig = this.configService.get('cms');
    if (!cmsConfig) {
      throw new CmsConfigError('Missing required Directus configuration');
    }

    this.apiUrl = `${cmsConfig.apiUrl}/graphql`;
    this.apiToken = cmsConfig.apiToken;
    this.timeout = cmsConfig.timeout || 5000;

    this.logger.log('Directus service initialized successfully');
  }

  async executeGraphQLQuery(query: string): Promise<any> {
    this.logger.debug(`Executing GraphQL query`);

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          { query },
          {
            headers: { Authorization: `Bearer ${this.apiToken}` },
            timeout: this.timeout,
          },
        ),
      );

      this.logger.debug('Query executed successfully');
      return response.data.data;
    } catch (error) {
      throw new CmsQueryError('Failed to fetch data from Directus', error);
    }
  }
}
