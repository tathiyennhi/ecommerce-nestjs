import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { ClassConstructor, plainToInstance } from "class-transformer";
import * as crypto from "crypto";

@Injectable()
export class Utils {
  static compareMD5Hash(password: string, hashedPassword: string): boolean {
    const md5Hash = crypto.createHash("md5").update(password).digest("hex");
    return md5Hash === hashedPassword;
  }
  static md5Hash(password: string): string {
    const md5Hash = crypto.createHash("md5").update(password).digest("hex");
    return md5Hash;
  }

  static transformToDTO<T>(
    dtoClass: ClassConstructor<T>, // Class của DTO
    plainData: any, // Dữ liệu gốc (thường là từ database)
    options: { excludeExtraneousValues: boolean } = {
      excludeExtraneousValues: true,
    }, // Tùy chọn chuyển đổi
  ): T[] {
    return plainToInstance(dtoClass, plainData, options);
  }
}
