import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-map', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.MAP_SERVICE_PORT,
      host: process.env.MAP_SERVICE_HOST,
    },
  };
});
