import { UlApi } from './configuration.interface';

export default (): { ulApi: UlApi } => ({
  ulApi: {
    tockUrl: process.env.CHATBOT_SERVICE_UL_API_TOCK_URL,
  },
});
