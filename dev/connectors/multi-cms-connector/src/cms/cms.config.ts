import { registerAs } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { CmsConfigError } from './cms.exception';

const logger = new Logger('CmsConfig');

export const cmsConfig = registerAs('cms', async () => {
  const defaultCms = process.env.DEFAULT_CMS || 'wordpress';
  logger.debug(`Loading configuration for CMS: ${defaultCms}`);

  const configPath = `./${defaultCms}/config/${defaultCms}.config`;
  logger.debug(`Attempting to import config from: ${configPath}`);

  let cmsModuleConfig: { default: () => any };

  try {
    cmsModuleConfig = await import(configPath);
  } catch (error) {
    const errorMessage = `Failed to load configuration for CMS: ${defaultCms}`;
    logger.error(errorMessage, error.stack);
    throw new CmsConfigError(errorMessage);
  }

  if (!cmsModuleConfig?.default) {
    const errorMessage = `Invalid config file structure for ${defaultCms}. Config file must have a default export.`;
    logger.error(errorMessage);
    throw new CmsConfigError(errorMessage);
  }

  const config = cmsModuleConfig.default();
  logger.log(`Successfully loaded configuration for ${defaultCms}`);

  return config;
});
