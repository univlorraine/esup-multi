import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-math', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.MATH_SERVICE_PORT,
      host: process.env.MATH_SERVICE_HOST,
    },
  };
});
