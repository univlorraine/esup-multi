export interface ExternalApiClockingQueryDto {
  login: string;
  ip: string;
  top: boolean;
}

export type ExternalApiClockingReplyDto = string[];

export interface ClockingQueryDto {
  username: string;
  ip: string;
}

export interface ClockingReplyDto {
  times: string[];
  day: string;
}
