import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Role } from "./entities/role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private repository: Repository<Role>) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const neww = this.repository.create({
        name: createRoleDto.name,
      });

      await this.repository.save(neww);
      return new Result(Status.SUCCESS, "Role created", null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message);
    }
  }

  findAll() {
    return `This action returns all role`;
  }

  async findOne(id: string) {
    // return `This action returns a #${id} role`;
    try {
      const found = await this.repository.findOne({
        where: { id },
      });
      if (!found) {
        return new Result(Status.ERROR, null, "Role not found");
      }
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message);
    }
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
