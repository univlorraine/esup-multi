import { DirectusApi } from './configuration.interface';

export default (): { directusApi: DirectusApi } => ({
  directusApi: {
    apiUrl: process.env.FEATURES_SERVICE_DIRECTUS_API_URL,
    bearerToken: process.env.FEATURES_SERVICE_DIRECTUS_API_BEARER_TOKEN,
  },
});
