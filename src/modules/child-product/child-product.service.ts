import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateChildProductDto } from './dto/create-child-product.dto';
import { UpdateChildProductDto } from './dto/update-child-product.dto';
import { ProductsService } from '../product/products.service';
import { ChildProduct } from './entities/child-product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChildProductService {
  constructor(
    @InjectRepository(ChildProduct)
    private repository: Repository<ChildProduct>,

    private productService: ProductsService
  ) {

  }


  async create(createChildProductDto: CreateChildProductDto) {
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
    return `This action returns all childProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} childProduct`;
  }

  update(id: number, updateChildProductDto: UpdateChildProductDto) {
    return `This action updates a #${id} childProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} childProduct`;
  }
}
