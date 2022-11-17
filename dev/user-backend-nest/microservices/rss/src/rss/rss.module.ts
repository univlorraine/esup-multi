import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RssController } from './rss.controller';
import { RssService } from './rss.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [RssService],
  controllers: [RssController],
})
export class RssModule {}
