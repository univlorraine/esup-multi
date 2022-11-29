import { UlApi } from './configuration.interface';

export default (): { ulApi: UlApi } => ({
  ulApi: {
    userCardsUrl: process.env.CARDS_SERVICE_UL_API_URL_USER_CARDS,
    bearerToken: process.env.CARDS_SERVICE_UL_API_BEARER_TOKEN,
  },
});
