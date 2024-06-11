import { Test, TestingModule } from '@nestjs/testing';
import { ChildProductController } from './child-product.controller';
import { ChildProductService } from './child-product.service';

describe('ChildProductController', () => {
  let controller: ChildProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChildProductController],
      providers: [ChildProductService],
    }).compile();

    controller = module.get<ChildProductController>(ChildProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
