import { forwardRef, Module } from '@nestjs/common';
import { ImportantNewsWordpressResolver } from './important-news.wordpress.resolver';
import { ImportantNewsWordpressService } from './important-news.wordpress.service';
import { WordpressModule } from '@wordpress/wordpress.module';

@Module({
  imports: [forwardRef(() => WordpressModule)],
  providers: [ImportantNewsWordpressResolver, ImportantNewsWordpressService],
})
export class ImportantNewsWordpressModule {}
