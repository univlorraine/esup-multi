import { forwardRef, Module } from '@nestjs/common';
import { LanguagesWordpressResolver } from './languages.wordpress.resolver';
import { LanguagesWordpressService } from './languages.wordpress.service';
import { WordpressModule } from '@wordpress/wordpress.module';

@Module({
  imports: [forwardRef(() => WordpressModule)],
  providers: [LanguagesWordpressResolver, LanguagesWordpressService],
})
export class LanguagesWordpressModule {}
