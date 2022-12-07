export interface AuthenticatedUserDto {
  username: string;
  authToken: string;
  roles: string[];
}
