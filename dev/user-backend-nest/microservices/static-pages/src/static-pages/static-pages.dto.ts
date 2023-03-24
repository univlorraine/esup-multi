export interface DirectusStaticPageResultDto {
  id: number;
  status: string;
  icon?: string;
  translations?: DirectusStaticPageTranslation[];
}

export interface DirectusResponse<T> {
  data: T;
}

export interface DirectusStaticPageTranslation {
  languages_code: string;
  title: string;
  content: string;
}
