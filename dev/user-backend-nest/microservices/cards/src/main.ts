import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const natsServers = (
    process.env.CARDS_SERVICE_NATS_SERVERS || 'nats://localhost:4222'
  )
    .split(',')
    .map((server) => server.trim());
  Logger.log(`Using nats servers: ${natsServers}`);

  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.EXTENDED_LOGS === 'true'
        ? ['error', 'warn', 'log', 'debug', 'verbose']
        : ['error', 'warn', 'log'],
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: natsServers,
      queue: 'cards',
    },
  });
  await app.startAllMicroservices();

  const host = process.env.CARDS_SERVICE_HOST || '127.0.0.1';
  const port = parseInt(process.env.CARDS_SERVICE_PORT) || 3007;
  Logger.log(`Listening on host ${host}, port ${port}`);
  await app.listen(port, host);
}
bootstrap();
