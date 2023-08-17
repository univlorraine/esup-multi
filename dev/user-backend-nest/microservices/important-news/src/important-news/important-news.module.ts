import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImportantNewsController } from './important-news.controller';
import { ImportantNewsService } from './important-news.service';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [ConfigModule, KeepaliveHttpModule],
  providers: [ImportantNewsService],
  controllers: [ImportantNewsController],
})
export class ImportantNewsModule {}
