import { UlApi } from './configuration.interfaces';

export default (): { ulApi: UlApi } => ({
  ulApi: {
    url: process.env.STATISTICS_SERVICE_UL_API_URL,
    bearerToken: process.env.STATISTICS_SERVICE_UL_API_BEARER_TOKEN,
  },
});
