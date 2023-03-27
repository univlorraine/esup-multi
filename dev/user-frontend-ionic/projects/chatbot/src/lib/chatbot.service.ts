import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatbotButtonPayloadRequest, ChatbotMessage, ChatbotTextRequest, MessageType } from './chatbot.dto';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient) { }

  textRequest(text: string, userId: string): Observable<ChatbotMessage[]> {
    if (!text) {
      return;
    }

    const url = `${this.environment.apiEndpoint}/chatbot/text-request`;
    const request: ChatbotTextRequest = {
      query: text,
      userId
    };

    return this.http.post<ChatbotMessage[]>(url, request).pipe(
      map(chatbotResponses =>  this.setMessageTypeToBot(chatbotResponses)));
  }

  buttonPayloadRequest(buttonPayload: string, userId: string): Observable<ChatbotMessage[]> {
    const request: ChatbotButtonPayloadRequest = { payload: buttonPayload, userId };

    const url = `${this.environment.apiEndpoint}/chatbot/button-payload-request`;

    return this.http.post<ChatbotMessage[]>(url , request).pipe(
      map(chatbotResponses =>  this.setMessageTypeToBot(chatbotResponses)));
  }

  private setMessageTypeToBot(chatbotResponses: ChatbotMessage[]): ChatbotMessage[]{
   return chatbotResponses.map((chatbotResponse: ChatbotMessage) => ({
      ...chatbotResponse,
      messageType: MessageType.bot} ) );
  }
}
