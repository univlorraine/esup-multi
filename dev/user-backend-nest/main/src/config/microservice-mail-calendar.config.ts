import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-mail-calendar', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.MAIL_CALENDAR_SERVICE_PORT,
      host: process.env.MAIL_CALENDAR_SERVICE_HOST,
    },
  };
});
