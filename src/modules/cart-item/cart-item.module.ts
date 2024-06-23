import { Module } from "@nestjs/common";
import { CartItemService } from "./cart-item.service";
import { CartItemController } from "./cart-item.controller";
import { UsersModule } from "../user/users.module";
import { CartModule } from "../cart/cart.module";
import { ChildProductModule } from "../child-product/child-product.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItem } from "./entities/cart-item.entity";

@Module({
  controllers: [CartItemController],
  providers: [CartItemService],
  imports: [
    UsersModule,
    CartModule,
    ChildProductModule,
    TypeOrmModule.forFeature([CartItem]),
  ],
})
export class CartItemModule {}
