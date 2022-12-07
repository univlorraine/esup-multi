interface Authorization {
  type: 'ALLOW' | 'DISALLOW';
  roles: string[];
}
export interface Info {
  id: number;
  title: string;
  content: string;
  link?: string;
  ssoService?: string;
  authorization?: Authorization;
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
  authorization?: Authorization;
}
