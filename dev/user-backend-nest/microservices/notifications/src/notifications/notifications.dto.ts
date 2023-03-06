export interface NotificationsQueryDto {
  username: string;
  offset: number;
  length: number;
}
export interface MarkAsReadQueryDto {
  username: string;
  notificationIds: string[];
}

export interface NotificationDto {
  id: string;
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
  code: string;
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

export interface NotificationDeleteQueryDto {
  id: number;
  login: string;
}
