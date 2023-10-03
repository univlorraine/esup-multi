import { CacheTtl, KeepAliveOptions, UlApi } from './configuration.interfaces';

const applyIfNotBlank = (param: string, applyFn: (value: string) => void) => {
  if (param && param.trim().length > 0) {
    applyFn(param);
  }
};

export default (): {
  ulApi: UlApi;
  keepAliveOptions: KeepAliveOptions;
  cacheTtl: CacheTtl;
  cacheMax: number;
} => {
  const keepAliveOptions = {};

  applyIfNotBlank(
    process.env.RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE,
    (value) => (keepAliveOptions['keepAlive'] = value === 'true'),
  );

  applyIfNotBlank(
    process.env.RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS,
    (value) => (keepAliveOptions['keepAliveMsecs'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT,
    (value) => (keepAliveOptions['freeSocketTimeout'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT,
    (value) => (keepAliveOptions['timeout'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS,
    (value) => (keepAliveOptions['maxSockets'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS,
    (value) => (keepAliveOptions['maxFreeSockets'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.RESTAURANTS_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL,
    (value) => (keepAliveOptions['socketActiveTTL'] = parseInt(value)),
  );

  return {
    ulApi: {
      url: process.env.RESTAURANTS_SERVICE_UL_API_URL,
      bearerToken: process.env.RESTAURANTS_SERVICE_UL_API_BEARER_TOKEN,
    },
    keepAliveOptions,
    cacheTtl: {
      restaurants: parseInt(
        process.env.RESTAURANTS_SERVICE_CACHE_TTL_MS_RESTAURANTS,
      ),
      menus: parseInt(process.env.RESTAURANTS_SERVICE_CACHE_TTL_MS_MENUS),
    },
    cacheMax: parseInt(process.env.RESTAURANTS_SERVICE_CACHE_MAX),
  };
};
