import { forwardRef, Module } from '@nestjs/common';
import { ContactUsDirectusResolver } from './contact-us.directus.resolver';
import { ContactUsDirectusService } from './contact-us.directus.service';
import { DirectusModule } from '@directus/directus.module';

@Module({
  imports: [forwardRef(() => DirectusModule)],
  providers: [ContactUsDirectusResolver, ContactUsDirectusService],
})
export class ContactUsDirectusModule {}
