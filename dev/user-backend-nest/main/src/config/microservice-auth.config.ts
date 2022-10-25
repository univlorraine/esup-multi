import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-auth', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.AUTH_SERVICE_PORT,
      host: process.env.AUTH_SERVICE_HOST,
    },
  };
});
