export interface MailCalendarQueryDto {
  login: string;
}

export interface MailCalendarReplyDto {
  unreadMails: number;
  events: MailCalendarEventDto[];
}

export interface MailCalendarEventDto {
  label: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
}