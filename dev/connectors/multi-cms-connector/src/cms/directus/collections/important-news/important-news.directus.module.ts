import { forwardRef, Module } from '@nestjs/common';
import { ImportantNewsDirectusResolver } from './important-news.directus.resolver';
import { ImportantNewsDirectusService } from './important-news.directus.service';
import { DirectusModule } from '@directus/directus.module';

@Module({
  imports: [forwardRef(() => DirectusModule)],
  providers: [ImportantNewsDirectusResolver, ImportantNewsDirectusService],
})
export class ImportantNewsDirectusModule {}
