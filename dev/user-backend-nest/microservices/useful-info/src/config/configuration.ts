import { DirectusApi } from './configuration.interface';

export default (): {
  directusApi: DirectusApi;
} => {
  return {
    directusApi: {
      apiUrl: process.env.USEFUL_INFO_SERVICE_DIRECTUS_API_URL,
      bearerToken:
        process.env.USEFUL_INFO_SERVICE_DIRECTUS_API_BEARER_TOKEN,
    },
  };
};
