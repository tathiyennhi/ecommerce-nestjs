import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "./modules/product/products.module";
import { ProductTypeModule } from "./modules/product-type/product-type.module";
import { MenuModule } from "./modules/menu/menu.module";
import { WinstonModule } from "nest-winston";
import { config } from "dotenv";

import { AuthModule } from "./modules/auth/auth.module";
import { ChildProductModule } from "./modules/child-product/child-product.module";
import { CategoryModule } from "./modules/category/category.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { CartModule } from "./modules/cart/cart.module";
import { OrderModule } from "./modules/order/order.module";
import { CartItemModule } from "./modules/cart-item/cart-item.module";

import { ConfigModule, ConfigService } from "@nestjs/config";
import typeorm from "./common/config/typeorm";
import winstonConfig from "./common/config/winston";
import { RoleModule } from "./modules/role/role.module";
import { PermissionModule } from "./modules/permission/permission.module";
import { RouteModule } from "./modules/route/route.module";
import { AdminModule } from "./modules/admin/admin.module";

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm, winstonConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get("typeorm"),
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get("winston"),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/public",
    }),
    MenuModule,
    CategoryModule,
    ProductTypeModule,
    ProductModule,
    ChildProductModule,
    AuthModule,
    CartModule,
    OrderModule,
    CartItemModule,
    RoleModule,
    PermissionModule,
    RouteModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
