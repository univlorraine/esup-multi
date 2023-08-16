export interface DirectusApi {
  apiUrl: string;
  bearerToken: string;
}

export interface keepAliveOptions {
  keepAlive?: boolean;
  keepAliveMsecs?: number;
  freeSocketTimeout?: number;
  timeout?: number;
  maxSockets?: number;
  maxFreeSockets?: number;
  socketActiveTTL?: number;
}
