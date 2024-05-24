import { Module } from '@nestjs/common';
import { ProductTypesService } from './product_types.service';
import { ProductTypesController } from './product_types.controller';
import { ProductType } from './entities/product_type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType])],
  controllers: [ProductTypesController],
  providers: [ProductTypesService],
})
export class ProductTypesModule {}
