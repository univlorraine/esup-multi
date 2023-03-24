import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-static-pages', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.STATIC_PAGES_SERVICE_PORT,
      host: process.env.STATIC_PAGES_SERVICE_HOST,
    },
  };
});
