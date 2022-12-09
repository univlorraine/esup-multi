import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-schedule', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.SCHEDULE_SERVICE_PORT,
      host: process.env.SCHEDULE_SERVICE_HOST,
    },
  };
});
