import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('microservice-social-network', () => {
  const natsServer = `nats://${process.env.SOCIAL_NETWORK_SERVICE_HOST}:${process.env.SOCIAL_NETWORK_SERVICE_PORT}`;
  return {
    transport: Transport.NATS,
    options: {
      servers: [natsServer],
    },
  };
});
