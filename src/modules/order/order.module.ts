import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { Order } from "./entities/order.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "../cart/cart.module";
import { ChildProductModule } from "../child-product/child-product.module";

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CartModule, ChildProductModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
