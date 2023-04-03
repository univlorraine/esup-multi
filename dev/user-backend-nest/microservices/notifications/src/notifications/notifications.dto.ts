export interface NotificationsQueryDto {
  username: string;
  offset: number;
  length: number;
}

export interface NotificationResultDto {
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

export interface NotificationsMarkAsReadQueryDto {
  username: string;
  notificationIds: string[];
}

export interface NotificationDeleteQueryDto {
  notificationId: string;
  username: string;
}

export interface UnsubscribedChannelsQueryDto {
  username: string;
}

export interface UnsubscribedChannelsResultDto {
  channels: string[];
}

export interface ChannelSubscriberQueryDto {
  username: string;
  channels: string[];
}

export interface DirectusChannelResultDto {
  id: number;
  code: string;
  translations?: DirectusChannelTranslation[];
  icon?: string;
  color?: string;
  routerLink?: string;
  filterable: boolean;
}

export interface DirectusResponse<T> {
  data: T;
}

export interface DirectusChannelTranslation {
  languages_code: string;
  label: string;
}
