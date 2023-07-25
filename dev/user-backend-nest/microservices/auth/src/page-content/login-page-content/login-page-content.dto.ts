interface LoginPageContentTranslation {
  languages_code: string;
  connexion_text: string;
  not_authentified_text: string;
}

export interface LoginPageContentResultDto {
  translations: LoginPageContentTranslation[];
}

export interface DirectusResponse<T> {
  data: T;
}
