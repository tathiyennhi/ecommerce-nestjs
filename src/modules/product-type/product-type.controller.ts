import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProductTypesService } from "./product-type.service";
import { CreateProductTypeDto } from "./dto/create-product-type.dto";
import { UpdateProductTypeDto } from "./dto/update-product-type.dto";
import { RouteGuard } from "src/common/guards/route-guard";

@Controller("product-types")
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @UseGuards(RouteGuard)
  @Post()
  async create(@Body() createProductTypeDto: CreateProductTypeDto) {
    return await this.productTypesService.create(createProductTypeDto);
  }

  @Get()
  findAll() {
    return this.productTypesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productTypesService.findOne(id);
  }

  @Get("/by-category/:id")
  findByCate(@Param("id") id: string) {
    return this.productTypesService.getByCategory(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProductTypeDto: UpdateProductTypeDto,
  ) {
    return this.productTypesService.update(+id, updateProductTypeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productTypesService.remove(+id);
  }
}
