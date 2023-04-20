import { Module } from '@nestjs/common';
import { PageContentService } from './page-content.service';
import { PageContentController } from './page-content.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [PageContentService],
  controllers: [PageContentController],
})
export class PageContentModule {}
