import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateChildProductDto } from "./dto/create-child-product.dto";
import { UpdateChildProductDto } from "./dto/update-child-product.dto";
import { ProductsService } from "../product/products.service";
import { ChildProduct } from "./entities/child-product.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";

@Injectable()
export class ChildProductService {
  constructor(
    @InjectRepository(ChildProduct)
    private repository: Repository<ChildProduct>,

    private productService: ProductsService,
  ) {}

  async create(createChildProductDto: CreateChildProductDto, file: any) {
    try {
      // Kiểm tra xem product có tồn tại không
      const found = await this.productService.findOne(
        createChildProductDto.productId,
      );
      if (!found.data) {
        return new Result(Status.ERROR, null, "Product not found");
      }

      // Tạo mới child product
      const neww = this.repository.create({
        name: createChildProductDto.name,
        size: createChildProductDto.size,
        product: found.data,
        color: createChildProductDto.color,
        quantity: createChildProductDto.quantity,
        price: createChildProductDto.price,
        image_link: file ? `/public/${file.filename}` : "tbd",
      });

      // Lưu child product vào database
      await this.repository.save(neww);
      return new Result(Status.SUCCESS, neww, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error.message);
    }
  }

  async updateImageLink(childProductId, file: any) {
    try {
      // find child product id
      const found = await this.findOne(childProductId);
      if (!found.data) {
        // throw new NotFoundException();
        return new Result(Status.ERROR, null, "Child product not found");
      }
      found.data.image_link = `/public/${file.filename}`;

      await this.repository.save(found.data);
      return new Result(Status.SUCCESS, found.data, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error.message);
    }
  }

  async setDefaultImageForProduct(childProductId: any, value: boolean) {
    try {
      // find child product id
      const found = await this.findOne(childProductId);
      if (!found.data) {
        return new Result(Status.ERROR, null, "Child product not found");
      }
      found.data.is_default_product = value;

      await this.repository.save(found.data);
      return new Result(Status.SUCCESS, found.data, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error.message);
    }
  }

  async updateQuantity(childProductId: any, value: number) {
    try {
      // find child product id
      const found = await this.findOne(childProductId);
      if (!found.data) {
        return new Result(Status.ERROR, null, "Child product not found");
      }
      found.data.quantity = value;

      await this.repository.save(found.data);
      return new Result(Status.SUCCESS, found.data, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error.message);
    }
  }

  
  findAll() {
    return `This action returns all childProduct`;
  }

  async findOne(id: string): Promise<Result> {
    try {
      const found = await this.repository.findOne({
        where: { id },
      });
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error.message);
    }
  }

  update(id: number, updateChildProductDto: UpdateChildProductDto) {
    return `This action updates a #${id} childProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} childProduct`;
  }
}
