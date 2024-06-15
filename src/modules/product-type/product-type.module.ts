import { Module } from "@nestjs/common";
import { ProductTypesService } from "./product-type.service";
import { ProductTypesController } from "./product-type.controller";
import { ProductType } from "./entities/product-type.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "../category/category.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProductType]), CategoryModule],
  controllers: [ProductTypesController],
  providers: [ProductTypesService],
  exports: [ProductTypesService],
})
export class ProductTypeModule {}
