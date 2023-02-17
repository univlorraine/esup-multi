import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ImportantNewsModule } from './important-news/important-news.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    ImportantNewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
