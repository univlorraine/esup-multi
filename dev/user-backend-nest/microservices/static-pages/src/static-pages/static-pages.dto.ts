export interface DirectusStaticPageResultDto {
  id: number;
  status: string;
  icon?: string;
  translations?: DirectusStaticPageTranslation[];
  statisticName?: string;
}

export interface DirectusResponse<T> {
  data: T;
}

export interface DirectusStaticPageTranslation {
  languages_code: string;
  title: string;
  content: string;
}
