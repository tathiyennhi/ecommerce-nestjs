import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { Menu } from "./entities/menu.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private repository: Repository<Menu>,
  ) {}

  // async create(createMenuDto: CreateMenuDto) {
  //   await this.repository.save(createMenuDto);

  //   return true;
  // }
  async create(createMenuDto: CreateMenuDto) {
    try {
      // Tạo mới Menu
      const newCategory = this.repository.create({
        name: createMenuDto.name,
      });

      // Lưu menu vào database
      await this.repository.save(newCategory);
      return new Result(Status.SUCCESS, newCategory, null);
    } catch (error) {
      // if (error instanceof NotFoundException) {
      //   throw error;
      // }
      // throw new InternalServerErrorException("Failed to create Menu");
      return new Result(Status.ERROR, null, error?.message || error?.stack);
    }
  }

  async findAll() {
    try {
      const data = await this.repository.find({
        relations: [
          "categories",
          "categories.product_types",
          "categories.product_types.products",
          "categories.product_types.products.child_products",
        ],
      });
      return new Result(Status.SUCCESS, data, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message || error?.stack);
    }
  }

  async findOne(id: any) {
    try {
      const found = await this.repository.findOne({
        where: {
          id,
        },
      });
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message || error?.stack);
    }
    // return await this.repository.findOne({
    //   where: {
    //     id,
    //   },
    // });
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    try {
      const found = await this.repository.findOne({
        where: {
          id,
        },
      });
      if (found) {
        found.name = updateMenuDto.name;
        await this.repository.save(found);
        return `This action updates a #${id} menu`;
      }
      throw new Error();
      throw new NotFoundException("Menu not found");
    } catch (error) {
      // Xử lý lỗi cụ thể hoặc ném ra lỗi đã được chuẩn hóa
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to update Menu");
    }

    return `This action updates a #${id} menu`;
  }

  remove(id: string) {
    this.repository.delete(id);
    return `This action removes a #${id} menu`;
  }
}
