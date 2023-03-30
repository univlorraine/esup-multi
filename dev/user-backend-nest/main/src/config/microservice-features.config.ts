import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-features', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.FEATURES_SERVICE_PORT,
      host: process.env.FEATURES_SERVICE_HOST,
    },
  };
});
