interface AuthTokenDto {
  authToken: string;
}

export interface AuthenticateQueryDto {
  username: string;
  password: string;
}

export interface UserProfileDto {
  displayName: string;
  name: string;
  firstname: string;
  email: string;
  roles: string[];
}

export type AuthenticatedDto = UserProfileDto & AuthTokenDto;
export type LogoutQueryDto = AuthTokenDto;
export type IsAuthenticationValidQueryDto = AuthTokenDto;
export type GetUsernameQueryDto = AuthTokenDto;

export interface SsoServiceTokenQueryDto extends AuthTokenDto {
  service: string;
}
