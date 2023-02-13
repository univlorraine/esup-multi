import { DirectusApi, UlApi } from './configuration.interface';

export default (): { ulApi: UlApi; directusApi: DirectusApi } => ({
  ulApi: {
    notificationsUrl:
      process.env.NOTIFICATIONS_SERVICE_UL_API_NOTIFICATIONS_URL,
    bearerToken: process.env.NOTIFICATIONS_SERVICE_UL_API_BEARER_TOKEN,
  },
  directusApi: {
    url: process.env.NOTIFICATIONS_SERVICE_DIRECTUS_API_URL,
    bearerToken: process.env.NOTIFICATIONS_SERVICE_DIRECTUS_API_BEARER_TOKEN,
  },
});
