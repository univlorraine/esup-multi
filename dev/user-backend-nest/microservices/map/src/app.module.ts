import { Module } from '@nestjs/common';
import { MapModule } from './map/map.module';
@Module({
  imports: [MapModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
