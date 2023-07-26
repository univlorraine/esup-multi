import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { StatisticsUserActionDto } from './statistics.dto';
import { StatisticsService } from './statistics.service';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @MessagePattern({ cmd: 'postUserActionStatistic' })
  postUserActionStatistic(statData: StatisticsUserActionDto): Observable<void> {
    return this.statisticsService.postUserActionStatistic(statData);
  }
}
