import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { Feature } from './features.dto';
import { FeaturesService } from './features.service';

@Controller()
export class FeaturesController {
  constructor(
    private featuresService: FeaturesService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @MessagePattern({ cmd: 'features' })
  async getFeatures(userRoles: string[]): Promise<Feature[]> {
    const cacheKey = `features-${userRoles.join('-')}`;
    const cachedFeatures = await this.cacheManager.get<Feature[]>(cacheKey);

    if (cachedFeatures !== undefined) {
      return cachedFeatures;
    }

    const features = await firstValueFrom(
      this.featuresService.getFeatures(userRoles),
    );

    const ttl = this.configService.get<number>('cacheTtl') || 300;
    await this.cacheManager.set(cacheKey, features, ttl);

    return features;
  }
}
