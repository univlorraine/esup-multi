import { DirectusApi } from './configuration.interface';

export default (): { directusApi: DirectusApi } => ({
  directusApi: {
    apiUrl: process.env.INFO_SERVICE_DIRECTUS_API_URL,
    bearerToken: process.env.INFO_SERVICE_DIRECTUS_API_BEARER_TOKEN,
  },
});
