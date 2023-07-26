import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  ChatbotButtonPayloadRequestDto,
  ChatbotResponseDto,
  ChatbotTextRequestDto,
} from './chatbot.dto';
import { ChatbotService } from './chatbot.service';

@Controller()
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @MessagePattern({ cmd: 'textRequest' })
  chatbotTextRequest(
    data: ChatbotTextRequestDto,
  ): Observable<ChatbotResponseDto[]> {
    return this.chatbotService.chatbotTextRequest(data);
  }

  @MessagePattern({ cmd: 'buttonRequest' })
  chatbotButtonPayloadRequest(
    data: ChatbotButtonPayloadRequestDto,
  ): Observable<ChatbotResponseDto[]> {
    return this.chatbotService.chatbotButtonPayloadRequest(data);
  }
}
