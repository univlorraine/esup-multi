import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable, ObservableInput, catchError, map, flatMap } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { DirectusApi } from './config/configuration.interface';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private directusApi: DirectusApi;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.directusApi = this.config.get<DirectusApi>('directusApi');
  }

  getUsefulInformation(): Observable<any[]> {
    const apiUrl = this.directusApi.apiUrl;
    const apiToken = this.directusApi.bearerToken;

    const sectionsUrl = `${apiUrl}/items/useful_information_section`;
    const infosUrl = `${apiUrl}/items/useful_information`;
    const requestConfig = {
      params: {
        fields: '*,translations.*',
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
    };

    return this.httpService.get<any>(sectionsUrl, requestConfig).pipe(
      catchError((err: any) => this.handleError('section', err)),
      flatMap((res) => {
        const sections = res.data.data;

        return this.httpService.get<any>(infosUrl, requestConfig).pipe(
          catchError((err: any) => this.handleError('information', err)),
          map((res) => this.formatData(sections, res.data.data)),
        );
      }),
    );
  }

  private formatData(sections, blocks): any[] {
    const mapping = {};

    sections.forEach((section) => (mapping[section.id] = section));

    blocks.forEach((block) => {
      if (block.section == undefined) return;

      mapping[block.section].blocks ??= [];
      mapping[block.section].blocks.push(block);
    });

    return sections;
  }

  private handleError(dataType: string, err: any): ObservableInput<any> {
    const errorMessage = `Unable to get Directus' '${dataType}'`;
    this.logger.error(errorMessage, err);
    throw new RpcException(errorMessage);
  }
}
