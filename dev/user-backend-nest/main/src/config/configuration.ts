import { SecurityConfiguration } from './configuration.interface';

export default (): { security: SecurityConfiguration } => ({
  security: {
    authJwtSecret: process.env.AUTH_SERVICE_JWT_SECRET,
  },
});
