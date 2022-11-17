import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-rss', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.RSS_SERVICE_PORT,
      host: process.env.RSS_SERVICE_HOST,
    },
  };
});
