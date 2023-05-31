import { InjectionToken } from '@angular/core';

export interface ChatbotModuleConfig {
    chatbotLogoRegex: RegExp;
};

export const CHATBOT_CONFIG =
  new InjectionToken<ChatbotModuleConfig>('Chatbot module config');
