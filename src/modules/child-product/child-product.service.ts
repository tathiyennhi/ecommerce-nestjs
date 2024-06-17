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

@Injectable()
export class ChildProductService {
  constructor(
    @InjectRepository(ChildProduct)
    private repository: Repository<ChildProduct>,

    private productService: ProductsService,
  ) {}

  async create(createChildProductDto: CreateChildProductDto, file: any) {
    try {
      // Kiểm tra xem child product có tồn tại không
      const found = await this.productService.findOne(
        createChildProductDto.productId,
      );
      if (!found) {
        throw new NotFoundException("child product not found");
      }

      // Tạo mới child product
      const neww = this.repository.create({
        name: createChildProductDto.name,
        size: createChildProductDto.size,
        product: found,
        color: createChildProductDto.color,
        quantity: createChildProductDto.quantity,
        price: createChildProductDto.price,
        image_link: file ? `/uploads/${file.filename}` : "tbd",
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

  async updateImageLink(childProductId, file: any) {
    try {
      // find child product id
      const found = await this.findOne(childProductId);
      if (!found) {
        throw new NotFoundException();
      }
      found.image_link = `/uploads/${file.filename}`;

      await this.repository.save(found);
    } catch (error) {}
  }

  async setDefaultImageForProduct(childProductId: any, value: boolean) {
    try {
      // find child product id
      const found = await this.findOne(childProductId);
      if (!found) {
        throw new NotFoundException();
      }
      found.is_default_product = value;

      await this.repository.save(found);
    } catch (error) {}
  }

  findAll() {
    return `This action returns all childProduct`;
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOne({
        where: { id },
      });
    } catch (error) {}
    // return `This action returns a #${id} childProduct`;
  }

  update(id: number, updateChildProductDto: UpdateChildProductDto) {
    return `This action updates a #${id} childProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} childProduct`;
  }
}
