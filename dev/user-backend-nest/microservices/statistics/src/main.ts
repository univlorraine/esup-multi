import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { StatisticsModule } from './statistics.module';

async function bootstrap() {
  const host = process.env.STATISTICS_SERVICE_HOST || '127.0.0.1';
  const port = parseInt(process.env.STATISTICS_SERVICE_PORT) || 3018;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StatisticsModule,
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