export interface UlApi {
  userScheduleUrl: string;
  bearerToken: string;
  scheduleAdminRoles: string[];
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
