import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-clocking', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.CLOCKING_SERVICE_PORT,
      host: process.env.CLOCKING_SERVICE_HOST,
    },
  };
});
