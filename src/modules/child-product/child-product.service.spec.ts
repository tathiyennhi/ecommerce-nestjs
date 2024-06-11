import { Test, TestingModule } from '@nestjs/testing';
import { ChildProductService } from './child-product.service';

describe('ChildProductService', () => {
  let service: ChildProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChildProductService],
    }).compile();

    service = module.get<ChildProductService>(ChildProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
