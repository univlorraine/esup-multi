import { DirectusApi } from './configuration.interface';

export default (): { directusApi: DirectusApi } => ({
  directusApi: {
    apiUrl: process.env.TILES_SERVICE_DIRECTUS_API_URL,
    bearerToken: process.env.TILES_SERVICE_DIRECTUS_API_BEARER_TOKEN,
  },
});
