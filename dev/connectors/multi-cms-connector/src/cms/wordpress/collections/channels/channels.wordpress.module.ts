import { forwardRef, Module } from '@nestjs/common';
import { ChannelsWordpressResolver } from './channels.wordpress.resolver';
import { ChannelsWordpressService } from './channels.wordpress.service';
import { WordpressModule } from '@wordpress/wordpress.module';

@Module({
  imports: [forwardRef(() => WordpressModule)],
  providers: [ChannelsWordpressResolver, ChannelsWordpressService],
})
export class ChannelsWordpressModule {}
