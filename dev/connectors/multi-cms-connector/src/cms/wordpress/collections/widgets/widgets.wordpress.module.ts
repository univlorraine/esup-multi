import { forwardRef, Module } from '@nestjs/common';
import { WidgetsWordpressResolver } from './widgets.wordpress.resolver';
import { WidgetsWordpressService } from './widgets.wordpress.service';
import { WordpressModule } from '@wordpress/wordpress.module';

@Module({
  imports: [forwardRef(() => WordpressModule)],
  providers: [WidgetsWordpressResolver, WidgetsWordpressService],
})
export class WidgetsWordpressModule {}
