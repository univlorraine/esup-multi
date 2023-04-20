import { MailConfig, DirectusApi } from './configuration.interface';

interface Configuration {
  directusApi: DirectusApi;
  mail: MailConfig;
}

export default (): Configuration => ({
  mail: {
    smtp: process.env.CONTACT_US_SERVICE_SMTP,
  },
  directusApi: {
    url: process.env.CONTACT_US_SERVICE_DIRECTUS_API_URL,
    bearerToken: process.env.CONTACT_US_SERVICE_DIRECTUS_API_BEARER_TOKEN,
  },
});
