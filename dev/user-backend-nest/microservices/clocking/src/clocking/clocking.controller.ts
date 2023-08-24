import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { ClockingQueryDto, ClockingReplyDto } from './clocking.dto';
import { ClockingService } from './clocking.service';

@Controller()
export class ClockingController {
  constructor(
    private clockingService: ClockingService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @MessagePattern({ cmd: 'clocking' })
  async getClocking(query: ClockingQueryDto): Promise<ClockingReplyDto> {
    const cacheKey = `clocking-${JSON.stringify(query)}`;

    const cachedClocking = await this.cacheManager.get<ClockingReplyDto>(
      cacheKey,
    );
    if (cachedClocking !== undefined) {
      return cachedClocking;
    }

    const clocking = await firstValueFrom(
      this.clockingService.getClocking(query),
    );

    const ttl = this.configService.get<number>('cacheTtl') || 300;
    await this.cacheManager.set(cacheKey, clocking, ttl);

    return clocking;
  }

  @MessagePattern({ cmd: 'clockIn' })
  async clockIn(query: ClockingQueryDto): Promise<ClockingReplyDto> {
    const cacheKey = `clocking-${JSON.stringify(query)}`;
    await this.cacheManager.del(cacheKey);

    return await firstValueFrom(this.clockingService.clockIn(query));
  }
}
