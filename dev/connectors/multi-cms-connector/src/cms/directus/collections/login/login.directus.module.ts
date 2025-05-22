import { forwardRef, Module } from '@nestjs/common';
import { LoginDirectusResolver } from './login.directus.resolver';
import { LoginDirectusService } from './login.directus.service';
import { DirectusModule } from '@directus/directus.module';

@Module({
  imports: [forwardRef(() => DirectusModule)],
  providers: [LoginDirectusResolver, LoginDirectusService],
})
export class LoginDirectusModule {}
