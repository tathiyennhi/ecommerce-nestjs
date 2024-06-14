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
      return await this.repository.save(newCategory);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to create Menu");
    }
  }

  findAll() {
    return this.repository.find({
      relations: [
        "categories",
        "categories.product_types",
        "categories.product_types.products",
        "categories.product_types.products.child_products",
      ],
    });
  }

  async findOne(id: any) {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
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
