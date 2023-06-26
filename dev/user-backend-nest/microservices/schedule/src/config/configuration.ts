import { UlApi } from './configuration.interface';

export default (): { ulApi: UlApi } => ({
  ulApi: {
    userScheduleUrl: process.env.SCHEDULE_SERVICE_UL_API_USER_SCHEDULE_URL,
    bearerToken: process.env.SCHEDULE_SERVICE_UL_API_BEARER_TOKEN,
    scheduleAdminRoles: process.env.SCHEDULE_SERVICE_ADMIN_ROLES
      ? process.env.SCHEDULE_SERVICE_ADMIN_ROLES.split(',')
      : [],
  },
});
