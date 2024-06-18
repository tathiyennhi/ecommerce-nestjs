import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductTypeDto } from "./dto/create-product-type.dto";
import { UpdateProductTypeDto } from "./dto/update-product-type.dto";
import { ProductType } from "./entities/product-type.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryService } from "../category/category.service";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private repository: Repository<ProductType>,
    private categoryService: CategoryService,
  ) {}

  async create(createProductTypeDto: CreateProductTypeDto) {
    try {
      // Kiểm tra xem menu có tồn tại không
      const cate = await this.categoryService.findOne(
        createProductTypeDto.categoryId,
      );
      if (!cate.data) {
        // throw new NotFoundException("Catefory not found");
        return new Result(Status.ERROR, null, "Category not found");
      }

      // Tạo mới product type
      const neww = this.repository.create({
        display_content: createProductTypeDto.displayContent,
        description: createProductTypeDto.description,
        category: cate.data,
      });

      // Lưu product type vào database
      await this.repository.save(neww);
      return new Result(Status.SUCCESS, neww, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error.message);
    }
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: any) {
    try {
      const found = await this.repository.findOne({
        where: {
          id,
        },
      });
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message || error?.stack);
    }
  }

  update(id: any, updateProductTypeDto: UpdateProductTypeDto) {
    this.repository.update(id, updateProductTypeDto);
    return `This action updates a #${id} productType`;
  }

  remove(id: any) {
    this.repository.delete(id);
    return `This action removes a #${id} productType`;
  }
}
