import { UlApi } from './configuration.interface';

export default (): { ulApi: UlApi } => ({
  ulApi: {
    apiUrl: process.env.MAIL_CALENDAR_SERVICE_UL_API_URL,
    bearerToken: process.env.MAIL_CALENDAR_SERVICE_UL_BEARER_TOKEN,
  },
});
