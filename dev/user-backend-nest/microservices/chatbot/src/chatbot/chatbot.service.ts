import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { UlApi } from '../config/configuration.interface';
import {
    ChatbotApiResponse, ChatbotButtonPayloadRequestDto,
    ChatbotResponseDto, ChatbotTextRequestDto
} from './chatbot.dto';

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);
  private ulApiConfig: UlApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.ulApiConfig = this.configService.get<UlApi>('ulApi');
  }

  public chatbotTextRequest(
    query: ChatbotTextRequestDto,
  ): Observable<ChatbotResponseDto[]> {
    const url = this.ulApiConfig.tockUrl;

    return this.httpService
      .post<ChatbotApiResponse<ChatbotResponseDto[]>>(url, query)
      .pipe(
        catchError((err: any) => {
          const errorMessage = 'Unable to get Tock response from text request';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => res.data.responses),
      );
  }

  public chatbotButtonPayloadRequest(
    query: ChatbotButtonPayloadRequestDto,
  ): Observable<ChatbotResponseDto[]> {
    const url = this.ulApiConfig.tockUrl;

    return this.httpService
      .post<ChatbotApiResponse<ChatbotResponseDto[]>>(url, query)
      .pipe(
        catchError((err: any) => {
          const errorMessage =
            'Unable to get Tock response from button payload request';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => res.data.responses),
      );
  }
}
