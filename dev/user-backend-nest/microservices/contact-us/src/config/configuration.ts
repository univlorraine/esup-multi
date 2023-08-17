import {
  MailConfig,
  DirectusApi,
  KeepAliveOptions,
} from './configuration.interface';

interface Configuration {
  directusApi: DirectusApi;
  mail: MailConfig;
  keepAliveOptions: KeepAliveOptions;
}

const applyIfNotBlank = (param: string, applyFn: (value: string) => void) => {
  if (param && param.trim().length > 0) {
    applyFn(param);
  }
};

export default (): Configuration => {
  const keepAliveOptions = {};

  applyIfNotBlank(
    process.env.CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVE,
    (value) => (keepAliveOptions['keepAlive'] = value === 'true'),
  );

  applyIfNotBlank(
    process.env.CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_KEEPALIVEMSECS,
    (value) => (keepAliveOptions['keepAliveMsecs'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_FREESOCKETTIMEOUT,
    (value) => (keepAliveOptions['freeSocketTimeout'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_TIMEOUT,
    (value) => (keepAliveOptions['timeout'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_MAXSOCKETS,
    (value) => (keepAliveOptions['maxSockets'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_MAXFREESOCKETS,
    (value) => (keepAliveOptions['maxFreeSockets'] = parseInt(value)),
  );

  applyIfNotBlank(
    process.env.CONTACT_US_SERVICE_AGENTKEEPALIVE_OPTION_SOCKETACTIVETTL,
    (value) => (keepAliveOptions['socketActiveTTL'] = parseInt(value)),
  );

  return {
    mail: {
      smtp: process.env.CONTACT_US_SERVICE_SMTP,
    },
    directusApi: {
      url: process.env.CONTACT_US_SERVICE_DIRECTUS_API_URL,
      bearerToken: process.env.CONTACT_US_SERVICE_DIRECTUS_API_BEARER_TOKEN,
    },
    keepAliveOptions,
  };
};
