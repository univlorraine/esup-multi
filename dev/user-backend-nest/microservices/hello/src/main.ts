import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = parseInt(process.env.HELLO_SERVICE_PORT) || 3001;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port,
      },
    },
  );
  logger.log(`Listening on port ${port}`);
  await app.listen();
}
bootstrap();
