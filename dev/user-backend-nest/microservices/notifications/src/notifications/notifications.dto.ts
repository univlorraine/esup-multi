export interface NotificationsQueryDto {
  username: string;
  offset: number;
  length: number;
}

export interface NotificationDto {
  id: number;
  author: string;
  channel: string;
  color: string;
  icon: string;
  title: string;
  message: string;
  state: string;
  creationDate: string;
}

export interface DirectusChannel {
  id: number;
  name: string;
  translations?: DirectusChannelTranslation[];
  icon?: string;
  color?: string;
  appsRouterLink?: string;
}

export interface DirectusResponse<T> {
  data: T;
}

export interface DirectusChannelTranslation {
  languages_code: string;
  label: string;
}
