import { forwardRef, Module } from '@nestjs/common';
import { StaticPagesWordpressResolver } from './static-pages.wordpress.resolver';
import { StaticPagesWordpressService } from './static-pages.wordpress.service';
import { WordpressModule } from '@wordpress/wordpress.module';

@Module({
  imports: [forwardRef(() => WordpressModule)],
  providers: [StaticPagesWordpressResolver, StaticPagesWordpressService],
})
export class StaticPagesWordpressModule {}
