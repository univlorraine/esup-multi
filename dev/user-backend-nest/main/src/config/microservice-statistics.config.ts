import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-statistics', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.STATISTICS_SERVICE_PORT,
      host: process.env.STATISTICS_SERVICE_HOST,
    },
  };
});
