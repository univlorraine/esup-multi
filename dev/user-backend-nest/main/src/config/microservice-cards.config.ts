import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-cards', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.CARDS_SERVICE_PORT,
      host: process.env.CARDS_SERVICE_HOST,
    },
  };
});
