import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { cmsConfig } from './cms.config';
import { CmsConfigError } from './cms.exception';
import { CmsService } from './cms.service';
import { DirectusModule } from '@directus/directus.module';
import { WordpressModule } from '@wordpress/wordpress.module';

const CMS_MODULES = {
  wordpress: WordpressModule,
  directus: DirectusModule,
  // strapi: StrapiModule,
} as const;

type CmsType = keyof typeof CMS_MODULES;

@Module({})
export class CmsModule {
  private static readonly logger = new Logger('CmsModule');

  static register(): DynamicModule {
    const defaultCms = (process.env.DEFAULT_CMS || 'wordpress') as CmsType;
    if (process.env.NODE_ENV !== 'production') {
      this.logger.debug(`Attempting to load CMS: ${defaultCms}`);
    }

    const selectedModule = CMS_MODULES[defaultCms];
    if (!selectedModule) {
      const availableCms = Object.keys(CMS_MODULES).join(', ');
      throw new CmsConfigError(
        `Invalid CMS "${defaultCms}". Available options: ${availableCms}`,
      );
    }

    this.logger.log(`Successfully loaded CMS Module: ${defaultCms}`);

    return {
      module: CmsModule,
      imports: [ConfigModule.forFeature(cmsConfig), selectedModule],
      providers: [CmsService],
      exports: [CmsService, selectedModule],
    };
  }
}
