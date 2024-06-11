import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private repository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    await this.repository.save(createMenuDto);

    return true;
  }

  findAll() {
    return this.repository.find(
      {
      relations: ['categories', 'categories.product_type'], // '
    }
  );
  }

  async findOne(id: any) {
    return await this.repository.findOne({
      where: {
        id
      }
    });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    this.repository.update(id, updateMenuDto);
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
