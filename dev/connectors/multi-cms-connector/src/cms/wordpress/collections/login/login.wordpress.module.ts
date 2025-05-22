import { forwardRef, Module } from '@nestjs/common';
import { LoginWordpressResolver } from './login.wordpress.resolver';
import { LoginWordpressService } from './login.wordpress.service';
import { WordpressModule } from '@wordpress/wordpress.module';

@Module({
  imports: [forwardRef(() => WordpressModule)],
  providers: [LoginWordpressResolver, LoginWordpressService],
})
export class LoginWordpressModule {}
