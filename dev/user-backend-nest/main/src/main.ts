import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EmptyResponseInterceptor } from './interceptors/empty-response.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new EmptyResponseInterceptor());
  app.enableCors({
    origin: `${process.env.API_GATEWAY_CORS_ORIGIN}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  const port = parseInt(process.env.API_GATEWAY_SERVER_PORT) || 3000;
  logger.log(`Listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
