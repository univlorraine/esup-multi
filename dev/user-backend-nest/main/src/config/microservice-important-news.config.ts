import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-important-news', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.IMPORTANT_NEWS_SERVICE_PORT,
      host: process.env.IMPORTANT_NEWS_SERVICE_HOST,
    },
  };
});
