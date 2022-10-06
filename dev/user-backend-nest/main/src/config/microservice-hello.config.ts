import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-hello', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.HELLO_SERVICE_PORT,
      host: process.env.HELLO_SERVICE_HOST,
    },
  };
});
