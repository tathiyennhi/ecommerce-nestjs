import { Injectable } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product_type.dto';
import { UpdateProductTypeDto } from './dto/update-product_type.dto';
import { ProductType } from './entities/product_type.entity';
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
    return 'This action adds a new productType';
  }

  findAll() {
    return this.repository.find();
    return `This action returns all productTypes`;
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
    return `This action returns a #${id} productType`;
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
