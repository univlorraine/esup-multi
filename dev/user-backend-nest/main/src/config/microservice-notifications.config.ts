import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-notifications', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.NOTIFICATIONS_SERVICE_PORT,
      host: process.env.NOTIFICATIONS_SERVICE_HOST,
    },
  };
});
