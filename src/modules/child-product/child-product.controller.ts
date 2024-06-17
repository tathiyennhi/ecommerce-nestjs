import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseFilters,
} from "@nestjs/common";
import { ChildProductService } from "./child-product.service";
import { CreateChildProductDto } from "./dto/create-child-product.dto";
import { UpdateChildProductDto } from "./dto/update-child-product.dto";

import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { MulterExceptionsFilter } from "src/common/exception-filters/multer-exception";

@Controller("child-product")
export class ChildProductController {
  constructor(private readonly childProductService: ChildProductService) {}

  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./public", // Thư mục lưu trữ ảnh
        filename: (req, file, cb) => {
          const timeNow = new Date();
          // Đặt tên file với UUID để tránh trùng tên
          const uniqueFilename = timeNow.getTime() + "_" + file.originalname;
          cb(null, uniqueFilename);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Kiểm tra loại file
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error("Chỉ cho phép upload file ảnh!"), false);
        }
        cb(null, true);
      },
    }),
  )
  // @UseFilters(MulterExceptionsFilter)
  @Post()
  async create(
    @Body() createChildProductDto: CreateChildProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.childProductService.create(createChildProductDto, file);
  }

  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./public", // Thư mục lưu trữ ảnh
        filename: (req, file, cb) => {
          const timeNow = new Date();
          // Đặt tên file với UUID để tránh trùng tên
          const uniqueFilename = timeNow.getTime() + "_" + file.originalname;
          cb(null, uniqueFilename);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Kiểm tra loại file
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error("Chỉ cho phép upload file ảnh!"), false);
        }
        cb(null, true);
      },
    }),
  )
  @Post("update-image-link")
  @UseFilters(MulterExceptionsFilter)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() childProductId: string,
  ) {
    try {
      await this.childProductService.updateImageLink(childProductId, file);
      return {
        originalname: file.originalname,
        filename: file.filename,
        path: `/public/${file.filename}`,
      };
    } catch (error) {}
    // console.log(file);
    // return "hinh duoc upload thanh cong";
  }

  @Get()
  findAll() {
    return this.childProductService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.childProductService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateChildProductDto: UpdateChildProductDto,
  ) {
    return this.childProductService.update(+id, updateChildProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.childProductService.remove(+id);
  }
}
