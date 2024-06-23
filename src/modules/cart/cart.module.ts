import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { Cart } from "./entities/cart.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../user/users.module";

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [TypeOrmModule.forFeature([Cart]), UsersModule],
  exports: [CartService],
})
export class CartModule {}
