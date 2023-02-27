import { UlApi } from './configuration.interface';

export default (): { ulApi: UlApi } => ({
  ulApi: {
    apiUrl: process.env.CLOCKING_SERVICE_UL_API_CLOCKING_URL,
    bearerToken: process.env.CLOCKING_SERVICE_UL_API_BEARER_TOKEN,
  },
});
