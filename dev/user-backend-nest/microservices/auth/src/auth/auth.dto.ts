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

export interface AuthenticatedDto extends UserProfileDto {
  authToken: string;
  username: string;
}

export interface LogoutQueryDto {
  authToken: string;
}

export interface SsoServiceTokenQueryDto {
  authToken: string;
  service: string;
}
