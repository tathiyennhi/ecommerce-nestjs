import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MenuService } from '../menu/menu.service';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Menu } from '../menu/entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {

  constructor(
    private menuService: MenuService,
    @InjectRepository(Category)
    private repository: Repository<Category>
  ) {

  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      // find menuId
    const menu = await this.menuService.findOne(createCategoryDto.menuId);
    if (!menu) {
      return "not ok, can not find menu"
    }
    const neww = this.repository.create({
      display_content: createCategoryDto.displayContent,
      description: createCategoryDto.description,
    })
    neww.menu = menu;
    // const neww = await this.repository.create(createCategoryDto);
    await this.repository.save(neww);

    return 'This action adds a new category';
      
    } catch (error) {
    return 'FFFFF';
      
    }
    
    
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
