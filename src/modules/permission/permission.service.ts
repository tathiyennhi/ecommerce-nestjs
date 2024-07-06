import { Injectable } from "@nestjs/common";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "./entities/permission.entity";
import { Repository } from "typeorm";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private repository: Repository<Permission>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const neww = this.repository.create({
        name: createPermissionDto.name,
      });

      await this.repository.save(neww);
      return new Result(Status.SUCCESS, "Permission created", null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message);
    }
  }

  findAll() {
    return `This action returns all permission`;
  }

  async findOne(id: string) {
    // return `This action returns a #${id} role`;
    try {
      const found = await this.repository.findOne({
        where: { id },
      });
      if (!found) {
        return new Result(Status.ERROR, null, "Permission not found");
      }
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message);
    }
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
