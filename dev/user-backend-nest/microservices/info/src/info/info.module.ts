import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [InfoService],
  controllers: [InfoController],
})
export class InfoModule {}
