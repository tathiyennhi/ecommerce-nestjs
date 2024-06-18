import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { MenuService } from "../menu/menu.service";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";

@Injectable()
export class CategoryService {
  constructor(
    private menuService: MenuService,
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const menu = await this.menuService.findOne(createCategoryDto.menuId);
      if (!menu) {
        return new Result(Status.ERROR, null, "Menu not found");
      }

      const newCategory = this.repository.create({
        display_content: createCategoryDto.displayContent,
        description: createCategoryDto.description,
        menu: menu,
      });

      await this.repository.save(newCategory);
      return new Result(Status.SUCCESS, newCategory, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message || error?.stack);
    }
  }

  findAll() {
    return `This action returns all category`;
  }

  async findOne(id: string) {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
