import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
      // Kiểm tra xem menu có tồn tại không
      const menu = await this.menuService.findOne(createCategoryDto.menuId);
      if (!menu) {
        throw new NotFoundException('Menu not found');
      }

      // Tạo mới Category
      const newCategory = this.repository.create({
        display_content: createCategoryDto.displayContent,
        description: createCategoryDto.description,
        menu: menu,
      });

      // Lưu Category vào database
      return await this.repository.save(newCategory);

    } catch (error) {
      // Xử lý lỗi cụ thể hoặc ném ra lỗi đã được chuẩn hóa
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create category');
    }
  }
  }
  // async create(createCategoryDto: CreateCategoryDto) {
  //   try {
  //     // find menuId
  //   const menu = await this.menuService.findOne(createCategoryDto.menuId);
  //   if (!menu) {
  //     return "not ok, can not find menu"
  //   }
  //   const neww = this.repository.create({
  //     display_content: createCategoryDto.displayContent,
  //     description: createCategoryDto.description,
  //   })
  //   neww.menu = menu;
  //   // const neww = await this.repository.create(createCategoryDto);
  //   await this.repository.save(neww);

  //   return 'This action adds a new category';
      
  //   } catch (error) {
  //   // return 'FFFFF';
  //     return {
  //       status: "error",
  //       message: error.message || error
  //     }
  //   }    
  // }

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
