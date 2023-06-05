import {
  CasUrl,
  DirectusApi,
  ScheduledCleanup,
  UlApi,
} from './configuration.interface';

interface Configuration {
  casUrl: CasUrl;
  ulApi: UlApi;
  mongoUrl: string;
  jwtSecret: string;
  usernamesCleanup: ScheduledCleanup;
  credentialsCleanup: ScheduledCleanup;
  directusApi: DirectusApi;
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
  usernamesCleanup: {
    schedule: process.env.AUTH_SERVICE_USERNAMES_CLEANUP_SCHEDULE,
    notUsedSinceInDays:
      parseInt(
        process.env.AUTH_SERVICE_USERNAMES_CLEANUP_NOT_USED_SINCE_IN_DAYS,
      ) || 30,
  },
  credentialsCleanup: {
    schedule: process.env.AUTH_SERVICE_CREDENTIALS_CLEANUP_SCHEDULE,
    notUsedSinceInDays:
      parseInt(
        process.env.AUTH_SERVICE_CREDENTIALS_CLEANUP_NOT_USED_SINCE_IN_DAYS,
      ) || 365,
  },
  directusApi: {
    url: process.env.AUTH_SERVICE_DIRECTUS_API_URL,
    bearerToken: process.env.AUTH_SERVICE_DIRECTUS_API_BEARER_TOKEN,
  },
});
