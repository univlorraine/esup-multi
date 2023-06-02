export interface Authorization {
  type: 'ALLOW' | 'DISALLOW';
  roles: string[];
}

export interface DirectusImportantNews {
  id: string;
  image?: string;
  color?: string;
  link?: string;
  authorization?: Authorization;
  translations?: DirectusImportantNewsTranslation[];
  statisticName?: string;
}

export interface DirectusResponse<T> {
  data: T;
}

export interface DirectusImportantNewsTranslation {
  language_code: string;
  title: string;
  content: string;
  buttonLabel?:string;
}
