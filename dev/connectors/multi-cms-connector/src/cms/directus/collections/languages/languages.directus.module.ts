import { forwardRef, Module } from '@nestjs/common';
import { LanguagesDirectusResolver } from './languages.directus.resolver';
import { LanguagesDirectusService } from './languages.directus.service';
import { DirectusModule } from '@directus/directus.module';

@Module({
  imports: [forwardRef(() => DirectusModule)],
  providers: [LanguagesDirectusResolver, LanguagesDirectusService],
})
export class LanguagesDirectusModule {}
