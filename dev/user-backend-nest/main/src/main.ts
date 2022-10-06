import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.API_GATEWAY_SERVER_PORT) || 3000;
  await app.listen(port);
}
bootstrap();
