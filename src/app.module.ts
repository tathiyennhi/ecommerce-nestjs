import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './business/product/products.module';
import { ProductType } from './business/product-type/entities/product-type.entity';
import { ProductTypeModule } from './business/product-type/product-type.module';
import { Product } from './business/product/entities/product.entity';
import { ChildProductModule } from './business/child-product/child-product.module';
import { MenuModule } from './business/menu/menu.module';
import { Menu } from './business/menu/entities/menu.entity';
import { Category } from './business/category/entities/category.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'test-db',
      entities: [Menu, ProductType, Product, Category],
      synchronize: true,
    }),
    ProductModule,
    ProductTypeModule,
    ChildProductModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
