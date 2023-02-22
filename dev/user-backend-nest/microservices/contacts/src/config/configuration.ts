import { UlApi } from './configuration.interfaces';

export default (): { ulApi: UlApi } => ({
  ulApi: {
    userProfileUrl: process.env.CONTACTS_SERVICE_UL_API_URL_USER_PROFILE,
    bearerToken: process.env.CONTACTS_SERVICE_UL_API_BEARER_TOKEN,
  },
});
