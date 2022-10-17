import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-info', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.INFO_SERVICE_PORT,
      host: process.env.INFO_SERVICE_HOST,
    },
  };
});
