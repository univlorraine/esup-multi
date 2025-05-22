import { forwardRef, Module } from '@nestjs/common';
import { SocialNetworksDirectusResolver } from './social-networks.directus.resolver';
import { SocialNetworksDirectusService } from './social-networks.directus.service';
import { DirectusModule } from '@directus/directus.module';

@Module({
  imports: [forwardRef(() => DirectusModule)],
  providers: [SocialNetworksDirectusResolver, SocialNetworksDirectusService],
})
export class SocialNetworksDirectusModule {}
