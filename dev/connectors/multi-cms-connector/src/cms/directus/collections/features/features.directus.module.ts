import { forwardRef, Module } from '@nestjs/common';
import { FeaturesDirectusResolver } from './features.directus.resolver';
import { FeaturesDirectusService } from './features.directus.service';
import { DirectusModule } from '@directus/directus.module';

@Module({
  imports: [forwardRef(() => DirectusModule)],
  providers: [FeaturesDirectusResolver, FeaturesDirectusService],
})
export class FeaturesDirectusModule {}
