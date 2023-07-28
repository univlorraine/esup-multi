export interface StatisticsUserActionDto {
  uid: string | null;
  userAgent: string;
  xForwardedFor: string;
  duid: string;
  action: 'OPEN';
  functionality: string;
  platform: string;
  connectionType: string;
}

export interface StatisticsExternalApiUserActionDto {
  uid: string | null;
  duid: string | null;
  action: string;
  service: string;
  platform: string | null;
  connection: string;
}
