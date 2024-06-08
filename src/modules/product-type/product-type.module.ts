import { Module } from '@nestjs/common';
import { ProductTypesService } from './product-type.service';
import { ProductTypesController } from './product-type.controller';
import { ProductType } from './entities/product-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType])],
  controllers: [ProductTypesController],
  providers: [ProductTypesService],
})
export class ProductTypeModule {}
