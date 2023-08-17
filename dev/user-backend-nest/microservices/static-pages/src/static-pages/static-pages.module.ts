import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StaticPagesController } from './static-pages.controller';
import { StaticPagesService } from './static-pages.service';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [ConfigModule, KeepaliveHttpModule],
  providers: [StaticPagesService],
  controllers: [StaticPagesController],
})
export class StaticPagesModule {}
