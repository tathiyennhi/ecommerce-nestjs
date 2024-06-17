import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ChildProductService } from './child-product.service';
import { CreateChildProductDto } from './dto/create-child-product.dto';
import { UpdateChildProductDto } from './dto/update-child-product.dto';

import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('child-product')
export class ChildProductController {
  constructor(private readonly childProductService: ChildProductService) {}

  @Post()
  async create(@Body() createChildProductDto: CreateChildProductDto) {
    return await this.childProductService.create(createChildProductDto);
  }

  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Thư mục lưu trữ ảnh
      filename: (req, file, cb) => {
        const timeNow = new Date()
        // Đặt tên file với UUID để tránh trùng tên
        const uniqueFilename = timeNow.getTime() + "_" + file.originalname;
        cb(null, uniqueFilename);
      }
    }),
    fileFilter: (req, file, cb) => {
      // Kiểm tra loại file
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Chỉ cho phép upload file ảnh!'), false);
      }
      cb(null, true);
    }
  }))
  @Post('upload')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return "hinh duoc upload thanh cong"
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

