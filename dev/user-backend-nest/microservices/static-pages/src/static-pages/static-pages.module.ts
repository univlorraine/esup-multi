import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StaticPagesController } from './static-pages.controller';
import { StaticPagesService } from './static-pages.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [StaticPagesService],
  controllers: [StaticPagesController],
})
export class StaticPagesModule {}
