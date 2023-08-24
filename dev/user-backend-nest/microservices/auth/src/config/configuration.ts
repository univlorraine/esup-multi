import {
  CasUrl,
  DirectusApi,
  KeepAliveOptions,
  ScheduledCleanup,
  UlApi,
} from './configuration.interface';

interface Configuration {
  casUrl: CasUrl;
  ulApi: UlApi;
  mongoUrl: string;
  jwtSecret: string;
  usernamesCleanup: ScheduledCleanup;
  credentialsCleanup: ScheduledCleanup;
  directusApi: DirectusApi;
  keepAliveOptions: KeepAliveOptions;
  cacheTtl: number;
}

const applyIfNotBlank = (param: string, applyFn: (value: string) => void) => {
  if (param && param.trim().length > 0) {
    applyFn(param);
  }
};

export default (): Configuration => {
  const keepAliveOptions = {};

  applyIfNotBlank(
    process.env.AUTH_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE,
    (value) => (keepAliveOptions['keepAlive'] = value === 'true'),
  );

  applyIfNotBlank(
    process.env.AUTH_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS,
    (value) => (keepAliveOptions['keepAliveMsecs'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.AUTH_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT,
    (value) => (keepAliveOptions['freeSocketTimeout'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.AUTH_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT,
    (value) => (keepAliveOptions['timeout'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.AUTH_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS,
    (value) => (keepAliveOptions['maxSockets'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.AUTH_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS,
    (value) => (keepAliveOptions['maxFreeSockets'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.AUTH_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL,
    (value) => (keepAliveOptions['socketActiveTTL'] = parseInt(value)),
  );

  return {
    casUrl: {
      requestTgt: process.env.AUTH_SERVICE_CAS_URL_REQUEST_TGT,
      requestSt: process.env.AUTH_SERVICE_CAS_URL_REQUEST_ST,
      validateTgt: process.env.AUTH_SERVICE_CAS_URL_VALIDATE_TGT,
      validateSt: process.env.AUTH_SERVICE_CAS_URL_VALIDATE_ST,
      logout: process.env.AUTH_SERVICE_CAS_URL_LOGOUT,
    },
    ulApi: {
      userProfileUrl: process.env.AUTH_SERVICE_UL_API_URL_USER_PROFILE,
      bearerToken: process.env.AUTH_SERVICE_UL_API_BEARER_TOKEN,
    },
    mongoUrl: process.env.AUTH_SERVICE_MONGO_URL,
    jwtSecret: process.env.AUTH_SERVICE_JWT_SECRET,
    usernamesCleanup: {
      schedule: process.env.AUTH_SERVICE_USERNAMES_CLEANUP_SCHEDULE,
      notUsedSinceInDays:
        parseInt(
          process.env.AUTH_SERVICE_USERNAMES_CLEANUP_NOT_USED_SINCE_IN_DAYS,
        ) || 30,
    },
    credentialsCleanup: {
      schedule: process.env.AUTH_SERVICE_CREDENTIALS_CLEANUP_SCHEDULE,
      notUsedSinceInDays:
        parseInt(
          process.env.AUTH_SERVICE_CREDENTIALS_CLEANUP_NOT_USED_SINCE_IN_DAYS,
        ) || 365,
    },
    directusApi: {
      url: process.env.AUTH_SERVICE_DIRECTUS_API_URL,
      bearerToken: process.env.AUTH_SERVICE_DIRECTUS_API_BEARER_TOKEN,
    },
    keepAliveOptions,
    cacheTtl: parseInt(process.env.AUTH_SERVICE_CACHE_TTL_MS),
  };
};
