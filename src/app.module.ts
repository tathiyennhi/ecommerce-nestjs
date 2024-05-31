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
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'test',
      entities: [ProductType, Product],
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
