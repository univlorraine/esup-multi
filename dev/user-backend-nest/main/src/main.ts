import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EmptyResponseInterceptor } from './interceptors/empty-response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const os = require('os');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      process.env.EXTENDED_LOGS === 'true'
        ? ['error', 'warn', 'log', 'debug', 'verbose']
        : ['error', 'warn', 'log'],
  });
  app.enable('trust proxy');
  app.useGlobalInterceptors(new EmptyResponseInterceptor());
  logger.log(`UV_THREADPOOL_SIZE before auto-tuning: ${process.env.UV_THREADPOOL_SIZE}`);
  process.env.UV_THREADPOOL_SIZE = os.cpus().length
  logger.log(`UV_THREADPOOL_SIZE after auto-tuning: ${os.cpus().length}`);
  const origin = (process.env.API_GATEWAY_CORS_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim());
  app.enableCors({
    origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  const host = process.env.API_GATEWAY_SERVER_HOST || '127.0.0.1';
  const port = parseInt(process.env.API_GATEWAY_SERVER_PORT) || 3000;
  logger.log(`Listening on host ${host}, port ${port}`);
  await app.listen(port, host);
}
bootstrap();
