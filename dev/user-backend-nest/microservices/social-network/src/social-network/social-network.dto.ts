export interface SocialNetworkDto {
  id: string;
  link: string;
  icon: string;
  title: string;
}

export interface DirectusResponse<T> {
  data: T;
}
