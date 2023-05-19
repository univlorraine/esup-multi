import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-restaurants', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.RESTAURANTS_SERVICE_PORT,
      host: process.env.RESTAURANTS_SERVICE_HOST,
    },
  };
});
