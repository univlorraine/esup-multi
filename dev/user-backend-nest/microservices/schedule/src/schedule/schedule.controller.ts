import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { Schedule, UserScheduleQueryDto } from './schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller()
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @MessagePattern({ cmd: 'schedule' })
  async getSchedule(data: UserScheduleQueryDto): Promise<Schedule> {
    const cacheKey = `schedule-${JSON.stringify(data)}`;

    const cachedSchedule = await this.cacheManager.get<Schedule>(cacheKey);
    if (cachedSchedule !== undefined) {
      return cachedSchedule;
    }

    const schedule = await firstValueFrom(
      this.scheduleService.getSchedule(data),
    );
    const ttl = this.configService.get<number>('cacheTtl') || 300;
    await this.cacheManager.set(cacheKey, schedule, ttl);

    return schedule;
  }
}
