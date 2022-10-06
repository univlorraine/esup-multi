import { Injectable } from '@nestjs/common';

@Injectable()
export class SumService {
  sum(numbers: number[]): number {
    return (numbers || []).reduce((a, b) => a + b);
  }
}
