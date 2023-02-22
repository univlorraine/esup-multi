export interface Contact {
  name: string;
  firstname: string;
  phoneNumbers: string[];
  mobileNumbers: string[];
  mailAdresses: string[];
  assignments: string[];
}

export interface ContactQueryDto {
  type: string;
  value: string;
  userId: string;
}
