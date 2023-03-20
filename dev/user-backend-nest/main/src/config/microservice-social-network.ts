import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-social-network', () => {
  return {
    transport: Transport.TCP,
    options: {
      port: process.env.SOCIAL_NETWORK_SERVICE_PORT,
      host: process.env.SOCIAL_NETWORK_SERVICE_HOST,
    },
  };
});
