interface PageContentTranslation {
  languages_code: string;
  title: string;
  content: string;
}

export interface PageContentResultDto {
  icon: string;
  translations: PageContentTranslation[];
}
