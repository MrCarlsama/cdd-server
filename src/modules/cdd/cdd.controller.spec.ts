import { Test, TestingModule } from '@nestjs/testing';
import { CddController } from './cdd.controller';

describe('CddController', () => {
  let controller: CddController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CddController],
    }).compile();

    controller = module.get<CddController>(CddController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
