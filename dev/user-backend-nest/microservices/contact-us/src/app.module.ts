import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { PageContentModule } from './page-content/page-content.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MailModule,
    PageContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
