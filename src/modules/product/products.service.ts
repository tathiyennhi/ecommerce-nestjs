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
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
    private productTypeService: ProductTypesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      // Kiểm tra xem product type có tồn tại không
      const found = await this.productTypeService.findOne(
        createProductDto.productTypeId,
      );
      if (found && !found.data) {
        return new Result(Status.ERROR, null, "Product type not found");
      }

      // Tạo mới Category
      const neww = this.repository.create({
        display_content: createProductDto.displayContent,
        fabric: createProductDto.fabric,
        product_type: found.data,
        code: createProductDto.code,
      });

      // Lưu product vào database
      await this.repository.save(neww);
      return new Result(Status.SUCCESS, neww, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message || error?.stack);
    }
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    try {
      const found = await this.repository.findOne({
        where: {
          id,
        },
      });
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error.message);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    // this.productRepository.update(id, updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
