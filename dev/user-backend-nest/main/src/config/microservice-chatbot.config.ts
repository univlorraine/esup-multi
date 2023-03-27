import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-chatbot', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.CHATBOT_SERVICE_PORT,
      host: process.env.CHATBOT_SERVICE_HOST,
    },
  };
});
