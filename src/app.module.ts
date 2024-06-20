import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "./modules/product/products.module";
import { ProductTypeModule } from "./modules/product-type/product-type.module";
// import { ChildProductModule } from './modules/child-product/child-product.module';
import { MenuModule } from "./modules/menu/menu.module";
import { WinstonModule } from "nest-winston";
import { config } from 'dotenv';

import * as winston from "winston";
import { AuthModule } from "./modules/auth/auth.module";
import { ChildProductModule } from "./modules/child-product/child-product.module";
import { CategoryModule } from "./modules/category/category.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { CartItemModule } from './modules/cart-item/cart-item.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // entities: [Menu, ProductType, Product, Category],
      entities: [__dirname + "/modules/../**/*.entity.{js,ts}"],
      synchronize: true,
    }),
    WinstonModule.forRoot({
      transports: [
        // Ghi log ra console
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        // Ghi log vào file
        new winston.transports.File({
          filename: "logs/app.log", // Đường dẫn tới file log
          // filename: `logs/app-${new Date().toISOString().split('T')[0]}.log`, // Đường dẫn tới file log
          level: "info", // Chỉ ghi các log từ mức độ này trở lên
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(), // Ghi log dưới định dạng JSON
          ),
        }),
        // Ghi log lỗi vào một file riêng
        new winston.transports.File({
          filename: "logs/error.log",
          level: "error", // Chỉ ghi các log lỗi
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
