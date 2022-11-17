import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { RssModule } from './rss/rss.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), RssModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
