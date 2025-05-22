import { forwardRef, Module } from '@nestjs/common';
import { WidgetsDirectusResolver } from './widgets.directus.resolver';
import { WidgetsDirectusService } from './widgets.directus.service';
import { DirectusModule } from '@directus/directus.module';

@Module({
  imports: [forwardRef(() => DirectusModule)],
  providers: [WidgetsDirectusResolver, WidgetsDirectusService],
})
export class WidgetsDirectusModule {}
