import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ContactsModule } from './contacts.module';

async function bootstrap() {
  const host = process.env.CONTACTS_SERVICE_HOST || '127.0.0.1';
  const port = parseInt(process.env.CONTACTS_SERVICE_PORT) || 3009;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ContactsModule,
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
