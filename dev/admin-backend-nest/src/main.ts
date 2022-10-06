import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.ADMIN_SERVER_PORT) || 4000
  await app.listen(port);
}
bootstrap();
