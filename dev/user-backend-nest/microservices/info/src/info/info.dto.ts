export interface Info {
  id: number;
  title: string;
  content: string;
  link?: string;
  ssoService?: string;
}

interface DirectusInfoTranslation {
  title: string;
  content: string;
}

export interface DirectusInfo {
  id: number;
  translations: DirectusInfoTranslation[];
  link?: string;
  ssoService?: string;
}
