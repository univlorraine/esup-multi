import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-contacts', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.CONTACTS_SERVICE_PORT,
      host: process.env.CONTACTS_SERVICE_HOST,
    },
  };
});
