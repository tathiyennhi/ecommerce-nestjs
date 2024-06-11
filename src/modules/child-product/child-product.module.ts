import { Module } from '@nestjs/common';
import { ChildProductService } from './child-product.service';
import { ChildProductController } from './child-product.controller';

@Module({
  controllers: [ChildProductController],
  providers: [ChildProductService],
})
export class ChildProductModule {}
