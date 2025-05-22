import { forwardRef, Module } from '@nestjs/common';
import { SocialNetworksWordpressResolver } from './social-networks.wordpress.resolver';
import { SocialNetworksWordpressService } from './social-networks.wordpress.service';
import { WordpressModule } from '@wordpress/wordpress.module';

@Module({
  imports: [forwardRef(() => WordpressModule)],
  providers: [SocialNetworksWordpressResolver, SocialNetworksWordpressService],
})
export class SocialNetworksWordpressModule {}
