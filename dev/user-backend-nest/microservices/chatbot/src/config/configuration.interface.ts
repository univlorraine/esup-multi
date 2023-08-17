export interface UlApi {
  tockUrl: string;
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
