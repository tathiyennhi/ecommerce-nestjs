import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { MenuService } from "../menu/menu.service";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";
import { GetCategoryResDto } from "./dto/get-all-.dto";
import { Utils } from "src/common/utils/utils";

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
      if (menu && !menu.data) {
        return new Result(Status.ERROR, null, "Menu not found");
      }

      const newCategory = this.repository.create({
        display_content: createCategoryDto.displayContent,
        description: createCategoryDto.description,
        menu: menu.data,
      });

      await this.repository.save(newCategory);
      return new Result(Status.SUCCESS, newCategory, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message || error?.stack);
    }
  }

  async findAll() {
    try {
      const data = await this.repository.find();
      const result = Utils.transformToDTO(GetCategoryResDto, data, {
        excludeExtraneousValues: true,
      });
      return new Result(Status.SUCCESS, result, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message || error?.stack);
    }
  }

  async findOne(id: string) {
    try {
      const found = await this.repository.findOne({
        where: {
          id,
        },
      });
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error.message);
    }
  }

  async getCategoriesByMenuId(menuId: string): Promise<Result> {
    try {
      const found = await this.repository.find({
        where: { menu: { id: menuId } },
      });
      const result = Utils.transformToDTO(GetCategoryResDto, found, {
        excludeExtraneousValues: true,
      });
      return new Result(Status.SUCCESS, result, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error.message);
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
