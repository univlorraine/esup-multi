import { forwardRef, Module } from '@nestjs/common';
import { PagesDirectusResolver } from './pages.directus.resolver';
import { PagesDirectusService } from './pages.directus.service';
import { DirectusModule } from '@directus/directus.module';

@Module({
  imports: [forwardRef(() => DirectusModule)],
  providers: [PagesDirectusResolver, PagesDirectusService],
})
export class PagesDirectusModule {}
