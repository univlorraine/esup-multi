import { DirectusApi, KeepAliveOptions } from './configuration.interface';

const applyIfNotBlank = (param: string, applyFn: (value: string) => void) => {
  if (param && param.trim().length > 0) {
    applyFn(param);
  }
};

export default (): {
  directusApi: DirectusApi;
  keepAliveOptions: KeepAliveOptions;
  cacheTtl: number;
  cacheMax: number;
} => {
  const keepAliveOptions = {};

  applyIfNotBlank(
    process.env.STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE,
    (value) => (keepAliveOptions['keepAlive'] = value === 'true'),
  );

  applyIfNotBlank(
    process.env.STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS,
    (value) => (keepAliveOptions['keepAliveMsecs'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT,
    (value) => (keepAliveOptions['freeSocketTimeout'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT,
    (value) => (keepAliveOptions['timeout'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS,
    (value) => (keepAliveOptions['maxSockets'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS,
    (value) => (keepAliveOptions['maxFreeSockets'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.STATIC_PAGES_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL,
    (value) => (keepAliveOptions['socketActiveTTL'] = parseInt(value)),
  );

  return {
    directusApi: {
      url: process.env.STATIC_PAGES_SERVICE_DIRECTUS_API_URL,
      bearerToken: process.env.STATIC_PAGES_SERVICE_DIRECTUS_API_BEARER_TOKEN,
    },
    keepAliveOptions,
    cacheTtl: parseInt(process.env.STATIC_PAGES_SERVICE_CACHE_TTL_MS),
    cacheMax: parseInt(process.env.STATIC_PAGES_SERVICE_CACHE_MAX),
  };
};
