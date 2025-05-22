import { forwardRef, Module } from '@nestjs/common';
import { ContactUsWordpressResolver } from './contact-us.wordpress.resolver';
import { ContactUsWordpressService } from './contact-us.wordpress.service';
import { WordpressModule } from '@wordpress/wordpress.module';

@Module({
  imports: [forwardRef(() => WordpressModule)],
  providers: [ContactUsWordpressResolver, ContactUsWordpressService],
})
export class ContactUsWordpressModule {}
