import { UlApi } from './configuration.interfaces';

export default (): { ulApi: UlApi } => ({
  ulApi: {
    url: process.env.RESTAURANTS_SERVICE_UL_API_URL,
    bearerToken: process.env.RESTAURANTS_SERVICE_UL_API_BEARER_TOKEN,
  },
});
