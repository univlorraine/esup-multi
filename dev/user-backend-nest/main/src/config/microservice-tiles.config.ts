import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-tiles', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.TILES_SERVICE_PORT,
      host: process.env.TILES_SERVICE_HOST,
    },
  };
});
