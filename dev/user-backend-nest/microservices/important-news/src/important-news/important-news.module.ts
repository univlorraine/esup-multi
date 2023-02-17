import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImportantNewsController } from './important-news.controller';
import { ImportantNewsService } from './important-news.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [ImportantNewsService],
  controllers: [ImportantNewsController],
})
export class ImportantNewsModule {}
