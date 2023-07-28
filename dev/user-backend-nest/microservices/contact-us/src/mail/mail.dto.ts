export interface SendMailQueryDto {
  from: string;
  subject: string;
  text: string;
  userData: {
    username: string;
    userAgent: string;
    platform: string;
    appVersion: string;
    connectionType: string;
  };
}

export interface ContactUsSettingsDto {
  to: string;
}
