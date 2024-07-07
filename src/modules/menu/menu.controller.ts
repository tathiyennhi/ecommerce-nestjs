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
  UseGuards,
  Req,
} from "@nestjs/common";
import { MenuService } from "./menu.service";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { RouteGuard } from "src/common/guards/route-guard";
import { Request } from "express";

@Controller("menu")
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(RouteGuard)
  @Post()
  async create(@Body() createMenuDto: CreateMenuDto, @Req() req: Request) {
    // this.logger.error("testtt");
    const createdBy =  "not implemented"; // req?.admin?.email ||
    const res = await this.menuService.create(createMenuDto, createdBy);
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
