import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { ProductTypesService } from "../product-type/product-type.service";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
    private productTypeService: ProductTypesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      // Kiểm tra xem prodict type có tồn tại không
      const found = await this.productTypeService.findOne(
        createProductDto.productTypeId,
      );
      if (!found) {
        throw new NotFoundException("product type not found");
      }

      // Tạo mới Category
      const neww = this.repository.create({
        display_content: createProductDto.displayContent,
        fabric: createProductDto.fabric,
        product_type: found,
        code: createProductDto.code,
      });

      // Lưu product vào database
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

  async findOne(id: string) {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    // this.productRepository.update(id, updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
