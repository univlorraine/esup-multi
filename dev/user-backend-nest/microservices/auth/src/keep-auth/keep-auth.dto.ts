import {
  AuthenticatedDto,
  IsAuthenticationValidQueryDto,
  LogoutQueryDto,
  SsoServiceTokenQueryDto,
} from '../auth/auth.dto';

export interface ReauthenticateQueryDto {
  uuid: string;
  key: string;
  iv: string;
}

export interface ReauthenticateIfNeededResultDto {
  reauthenticated: AuthenticatedDto | null;
}

export interface KeepAuthenticatedDto extends AuthenticatedDto {
  refreshAuthToken: string;
}

export type RemoveSavedCredentialsQueryDto = ReauthenticateQueryDto;

export type KeepAuthenticatedLogoutQueryDto = ReauthenticateQueryDto &
  LogoutQueryDto;

export type ReauthenticateIfNeededQueryDto = ReauthenticateQueryDto &
  IsAuthenticationValidQueryDto;

export type KeepAuthenticatedSsoServiceTokenQueryDto = ReauthenticateQueryDto &
  SsoServiceTokenQueryDto;

export interface KeepAuthenticatedSsoServiceTokenResultDto {
  serviceToken: string;
  reauthenticated: AuthenticatedDto | null;
}
