import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Schedule, UserScheduleQueryDto } from './schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @MessagePattern({ cmd: 'schedule' })
  getSchedule(data: UserScheduleQueryDto): Observable<Schedule> {
    return this.scheduleService.getSchedule(data);
  }
}
