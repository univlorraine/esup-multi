export interface CasUrl {
  requestTgt: string;
  requestSt: string;
  validateSt: string;
  validateTgt: string;
  logout: string;
}
export interface UlApi {
  bearerToken: string;
  userProfileUrl: string;
}

export interface CredentialsCleanup {
  schedule: string;
  notUsedSinceInDays: number;
}
