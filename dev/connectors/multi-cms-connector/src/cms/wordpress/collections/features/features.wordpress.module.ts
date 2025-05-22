import { forwardRef, Module } from '@nestjs/common';
import { FeaturesWordpressResolver } from './features.wordpress.resolver';
import { FeaturesWordpressService } from './features.wordpress.service';
import { WordpressModule } from '@wordpress/wordpress.module';

@Module({
  imports: [forwardRef(() => WordpressModule)],
  providers: [FeaturesWordpressResolver, FeaturesWordpressService],
})
export class FeaturesWordpressModule {}
