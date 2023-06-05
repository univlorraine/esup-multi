import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const host = process.env.AUTH_SERVICE_HOST || '127.0.0.1';
  const port = parseInt(process.env.AUTH_SERVICE_PORT) || 3004;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    },
  );
  Logger.log(`Listening on host ${host}, port ${port}`);
  await app.listen();
}
bootstrap();
