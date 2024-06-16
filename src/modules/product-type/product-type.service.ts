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
      if (!cate) {
        throw new NotFoundException("Catefory not found");
      }

      // Tạo mới product type
      const neww = this.repository.create({
        display_content: createProductTypeDto.displayContent,
        description: createProductTypeDto.description,
        category: cate,
      });

      // Lưu product type vào database
      return await this.repository.save(neww);
    } catch (error) {
      // Xử lý lỗi cụ thể hoặc ném ra lỗi đã được chuẩn hóa
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to create category");
    }
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: any) {
    try {
      return await this.repository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      return null;
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
