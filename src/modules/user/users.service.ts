/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Utils } from "src/common/utils/utils";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const foundUser = await this.findByEmail(createUserDto.email);
      if (foundUser.data) {
        return new Result(Status.ERROR, null, "User found");
      }

      const neww = this.repository.create({
        email: createUserDto.email,
        name: createUserDto.name,
        create_via: createUserDto.createVia,
      });

      if (createUserDto.picture) {
        neww.picture = createUserDto.picture;
      }

      if (createUserDto.password) {
        neww.password = Utils.md5Hash(createUserDto.password);
      }
      await this.repository.save(neww);
      return new Result(Status.SUCCESS, "User created", null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message);
    }
  }

  async updatePassword(updateUserDto: UpdateUserDto) {
    try {
      const foundUser = await this.findByEmail(updateUserDto.email);
      if (!foundUser.data) {
        return new Result(Status.ERROR, null, "User found");
      }

      foundUser.password = Utils.md5Hash(updateUserDto.password);
      await this.repository.save(foundUser);
      return new Result(Status.SUCCESS, "Password updated successfully", null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message);
    }
  }

  async findById(id: string): Promise<any | undefined> {
    try {
      const found = await this.repository.findOne({
        where: {
          id,
        },
      });
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message || error?.stack);
    }
  }

  async findByEmail(email: string): Promise<any | undefined> {
    try {
      const found = await this.repository.findOne({
        where: {
          email,
        },
      });
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message || error?.stack);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
