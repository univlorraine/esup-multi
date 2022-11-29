import { UlApi, CasUrl, CredentialsCleanup } from './configuration.interface';

interface Configuration {
  casUrl: CasUrl;
  ulApi: UlApi;
  mongoUrl: string;
  jwtSecret: string;
  credentialsCleanup: CredentialsCleanup;
}

export default (): Configuration => ({
  casUrl: {
    requestTgt: process.env.AUTH_SERVICE_CAS_URL_REQUEST_TGT,
    requestSt: process.env.AUTH_SERVICE_CAS_URL_REQUEST_ST,
    validateTgt: process.env.AUTH_SERVICE_CAS_URL_VALIDATE_TGT,
    validateSt: process.env.AUTH_SERVICE_CAS_URL_VALIDATE_ST,
    logout: process.env.AUTH_SERVICE_CAS_URL_LOGOUT,
  },
  ulApi: {
    userProfileUrl: process.env.AUTH_SERVICE_UL_API_URL_USER_PROFILE,
    bearerToken: process.env.AUTH_SERVICE_UL_API_BEARER_TOKEN,
  },
  mongoUrl: process.env.AUTH_SERVICE_MONGO_URL,
  jwtSecret: process.env.AUTH_SERVICE_JWT_SECRET,
  credentialsCleanup: {
    schedule: process.env.AUTH_SERVICE_CREDENTIALS_CLEANUP_SCHEDULE,
    notUsedSinceInDays:
      parseInt(
        process.env.AUTH_SERVICE_CREDENTIALS_CLEANUP_NOT_USED_SINCE_IN_DAYS,
      ) || 365,
  },
});
