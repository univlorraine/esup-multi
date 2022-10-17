import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';

@Module({
  providers: [InfoService],
  controllers: [InfoController],
})
export class InfoModule {}
