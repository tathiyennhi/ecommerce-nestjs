import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";

@Injectable()
export class AdminService {
  constructor(
    // private jwtService: JwtService,
    @InjectRepository(Admin)
    private repository: Repository<Admin>,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    return "This action adds a new admin";
  }

  findAll() {
    return `This action returns all admin`;
  }

  async check(email: string, password: string) {
    try {
      const found = await this.repository.findOne({
        where: {
          email,
          password,
        },
      });
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(
        Status.ERROR,
        null,
        error?.message || "check admin fail",
      );
    }
  }
  async findAdmin(email: string) {
    try {
      const found = await this.repository.findOne({
        where: {
          email,
        },
        relations: ["roles", "permissions"],
      });
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(
        Status.ERROR,
        null,
        error?.message || "check admin fail",
      );
    }
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
