import { Controller } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsUserActionDto } from './statistics.dto';
import { Observable } from 'rxjs';
import { MessagePattern } from '@nestjs/microservices';
import * as infosJsonData from './infos.json';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @MessagePattern({ cmd: 'postUserActionStatistic' })
  postUserActionStatistic(statData: StatisticsUserActionDto): Observable<void> {
    return this.statisticsService.postUserActionStatistic(statData);
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
