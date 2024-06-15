import { Module } from "@nestjs/common";
import { ChildProductService } from "./child-product.service";
import { ChildProductController } from "./child-product.controller";
import { ChildProduct } from "./entities/child-product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ChildProduct])],
  controllers: [ChildProductController],
  providers: [ChildProductService],
})
export class ChildProductModule {}
