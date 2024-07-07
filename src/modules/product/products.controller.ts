import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
// import { UpdateProductDto } from "./dto/update-product.dto";
import { PagingQueryDto } from "src/common/base-dtos/paging-query.dto";
import { RouteGuard } from "src/common/guards/route-guard";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(RouteGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query: PagingQueryDto) {
    const { page, itemsPerPage } = query;

    return this.productsService.getProducts(page, itemsPerPage);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(id);
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(id, updateProductDto);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
