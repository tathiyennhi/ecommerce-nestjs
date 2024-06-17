import { Module } from "@nestjs/common";
import { ChildProductService } from "./child-product.service";
import { ChildProductController } from "./child-product.controller";
import { ChildProduct } from "./entities/child-product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MulterModule } from "@nestjs/platform-express";
import { ProductModule } from "../product/products.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ChildProduct]),
    MulterModule.register({
      dest: "./upload",
    }),
    ProductModule,
  ],
  controllers: [ChildProductController],
  providers: [ChildProductService],
})
export class ChildProductModule {}
