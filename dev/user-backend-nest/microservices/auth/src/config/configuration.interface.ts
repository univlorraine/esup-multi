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

export interface ScheduledCleanup {
  schedule: string;
  notUsedSinceInDays: number;
}

export interface DirectusApi {
  url: string;
  bearerToken: string;
}

export interface KeepAliveOptions {
  keepAlive?: boolean;
  keepAliveMsecs?: number;
  freeSocketTimeout?: number;
  timeout?: number;
  maxSockets?: number;
  maxFreeSockets?: number;
  socketActiveTTL?: number;
}
