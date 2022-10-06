import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SumService } from './sum.service';

@Controller('sum')
export class SumController {
  constructor(private readonly sumService: SumService) {}

  @MessagePattern({ cmd: 'sum' })
  accumulate(numbers: number[]): number {
    return this.sumService.sum(numbers);
  }
}
