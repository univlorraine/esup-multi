import { UlApi, CasUrl } from './configuration.interface';

export default (): { casUrl: CasUrl; ulApi: UlApi } => ({
  casUrl: {
    requestTgt: process.env.AUTH_SERVICE_CAS_URL_REQUEST_TGT,
    requestSt: process.env.AUTH_SERVICE_CAS_URL_REQUEST_ST,
    validateSt: process.env.AUTH_SERVICE_CAS_URL_VALIDATE_ST,
    logout: process.env.AUTH_SERVICE_CAS_URL_LOGOUT,
  },
  ulApi: {
    userProfileUrl: process.env.AUTH_SERVICE_UL_API_URL_USER_PROFILE,
    bearerToken: process.env.AUTH_SERVICE_UL_API_BEARER_TOKEN,
  },
});
