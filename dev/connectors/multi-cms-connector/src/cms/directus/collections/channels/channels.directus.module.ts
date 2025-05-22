import { forwardRef, Module } from '@nestjs/common';
import { ChannelsDirectusResolver } from './channels.directus.resolver';
import { ChannelsDirectusService } from './channels.directus.service';
import { DirectusModule } from '@directus/directus.module';

@Module({
  imports: [forwardRef(() => DirectusModule)],
  providers: [ChannelsDirectusResolver, ChannelsDirectusService],
})
export class ChannelsDirectusModule {}
