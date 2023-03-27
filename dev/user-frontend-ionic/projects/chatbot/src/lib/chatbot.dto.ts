export type Message = ChatbotMessage | UserMessage;

export enum MessageType {
   bot,
   user
}

interface MessageTypeCommon {
  messageType: MessageType;
}

export interface ChatbotMessage extends MessageTypeCommon {
  text: string;
  buttons?: ChatButton[];
  card?: ChatCard;
  messageType: MessageType.bot;
}

export interface ChatbotTextRequest {
  query: string;
  userId: string;
}

export interface ChatbotButtonPayloadRequest {
  payload: string;
  userId: string;
}

export interface UserMessage extends MessageTypeCommon{
  text: string;
  messageType: MessageType.user;
}

export interface ChatButton {
  title?: string;
  payload?: string;
}

interface ChatCard {
  title?: string;
  subTitle?: string;
  buttons?: [];
  file: ChatFile;
  actions?: ChatAction[];
}

interface ChatFile {
  url?: string;
  name: string;
  type: string;
}

interface ChatAction {
  title: string;
}
