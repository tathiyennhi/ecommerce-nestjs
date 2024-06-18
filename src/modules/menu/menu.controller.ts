import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Inject,
  InternalServerErrorException,
} from "@nestjs/common";
import { MenuService } from "./menu.service";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Controller("menu")
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    // this.logger.error("testtt");
    const res = await this.menuService.create(createMenuDto);
    return res;
  }

  @Get()
  async findAll() {
    const res = await this.menuService.findAll();
    return res;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.menuService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMenuDto: UpdateMenuDto) {
    try {
      return this.menuService.update(id, updateMenuDto);
    } catch (error) {
      throw new InternalServerErrorException("Failed to update menu");
    }
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.menuService.remove(id);
  }
}
