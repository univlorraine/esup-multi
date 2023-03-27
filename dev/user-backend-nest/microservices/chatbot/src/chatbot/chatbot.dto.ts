export interface ChatbotTextRequestDto {
  query: string;
  userId: string;
}

export interface ChatbotButtonPayloadRequestDto {
  payload: string;
  userId: string;
}

export interface ChatbotResponseDto {
  text: string;
  buttons?: ChatButton[];
  card?: ChatCard;
}

export interface ChatbotApiResponse<T> {
  responses: T;
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

interface ChatButton {
  title?: string;
  payload?: string;
}
