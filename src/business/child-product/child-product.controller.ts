import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChildProductService } from './child-product.service';
import { CreateChildProductDto } from './dto/create-child-product.dto';
import { UpdateChildProductDto } from './dto/update-child-product.dto';

@Controller('child-product')
export class ChildProductController {
  constructor(private readonly childProductService: ChildProductService) {}

  @Post()
  create(@Body() createChildProductDto: CreateChildProductDto) {
    return this.childProductService.create(createChildProductDto);
  }

  @Get()
  findAll() {
    return this.childProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.childProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChildProductDto: UpdateChildProductDto) {
    return this.childProductService.update(+id, updateChildProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childProductService.remove(+id);
  }
}
