import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ClockingQueryDto, ClockingReplyDto } from './clocking.dto';
import { ClockingService } from './clocking.service';
import * as infosJsonData from '../infos.json';

@Controller()
export class ClockingController {
  constructor(private clockingService: ClockingService) {}

  @MessagePattern({ cmd: 'clocking' })
  getClocking(query: ClockingQueryDto): Observable<ClockingReplyDto> {
    return this.clockingService.getClocking(query);
  }

  @MessagePattern({ cmd: 'clockIn' })
  clockIn(query: ClockingQueryDto): Observable<ClockingReplyDto> {
    return this.clockingService.clockIn(query);
  }

  @MessagePattern({ cmd: 'health' })
  getHealthStatus() {
    return {
      message: 'up',
      name: infosJsonData.name,
      version: infosJsonData.version,
    };
  }
}
