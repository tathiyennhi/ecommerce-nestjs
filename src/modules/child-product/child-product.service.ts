import { Injectable } from '@nestjs/common';
import { CreateChildProductDto } from './dto/create-child-product.dto';
import { UpdateChildProductDto } from './dto/update-child-product.dto';

@Injectable()
export class ChildProductService {
  create(createChildProductDto: CreateChildProductDto) {
    return 'This action adds a new childProduct';
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
