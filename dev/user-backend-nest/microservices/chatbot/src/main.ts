import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const host = process.env.CHATBOT_SERVICE_HOST || '127.0.0.1';
  const port = parseInt(process.env.CHATBOT_SERVICE_PORT) || 3014;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
      logger:
        process.env.EXTENDED_LOGS === 'true'
          ? ['error', 'warn', 'log', 'debug', 'verbose']
          : ['error', 'warn', 'log'],
    },
  );

  Logger.log(`Listening on host ${host}, port ${port}`);
  await app.listen();
}
bootstrap();
