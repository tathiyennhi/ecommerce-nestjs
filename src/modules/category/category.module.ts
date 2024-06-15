import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { MenuModule } from "../menu/menu.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [MenuModule, TypeOrmModule.forFeature([Category])],
  exports: [CategoryService],
})
export class CategoryModule {}
