import { DirectusApi } from './configuration.interface';

export default (): { directusApi: DirectusApi } => ({
  directusApi: {
    url: process.env.IMPORTANT_NEWS_SERVICE_DIRECTUS_API_URL,
    bearerToken: process.env.IMPORTANT_NEWS_SERVICE_DIRECTUS_API_BEARER_TOKEN,
  },
});
