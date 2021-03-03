import { Test, TestingModule } from '@nestjs/testing';
import { CddService } from './cdd.service';

describe('CddService', () => {
  let service: CddService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CddService],
    }).compile();

    service = module.get<CddService>(CddService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
