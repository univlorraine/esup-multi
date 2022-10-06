import { Test, TestingModule } from '@nestjs/testing';
import { SumService } from './sum.service';

describe('SumService', () => {
  let service: SumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SumService],
    }).compile();

    service = module.get<SumService>(SumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
