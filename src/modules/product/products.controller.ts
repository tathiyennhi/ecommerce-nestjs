import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query("page") page: number,
    @Query("itemPerPage") itemPerPage: number,
  ) {
    const pageNumber = page; // Mặc định là 1 nếu không có giá trị
    const itemsPerPage = itemPerPage; // Mặc định là 10 nếu không có giá trị
    if (pageNumber <= 0 || itemsPerPage < 0) {
      return new Result(
        Status.ERROR,
        null,
        "Please supply correct paging params!",
      );
    }
    return this.productsService.getProducts(pageNumber, itemsPerPage);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
