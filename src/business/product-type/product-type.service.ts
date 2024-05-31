import { Injectable } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductType } from './entities/product-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private repository: Repository<ProductType>,
  ) {}

  async create(createProductTypeDto: CreateProductTypeDto) {
    try {
      console.log('This action adds a new product', createProductTypeDto);

      await this.repository.save(createProductTypeDto);
      return true;
    } catch (error) {
      return false;
    }
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    this.repository.update({ id }, updateProductTypeDto);
    return `This action updates a #${id} productType`;
  }

  remove(id: number) {
    this.repository.delete(id);
    return `This action removes a #${id} productType`;
  }
}
