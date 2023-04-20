import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-contact-us', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.CONTACT_US_SERVICE_PORT,
      host: process.env.CONTACT_US_SERVICE_HOST,
    },
  };
});
