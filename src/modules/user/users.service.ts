import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  private readonly users = [
    {
      userId: "1",
      username: "john",
      password: "changeme",
    },
    {
      userId: "2",
      username: "maria",
      password: "guess",
    },
  ];

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find((user) => user.username === username);
  }
  async findById(id: string): Promise<any | undefined> {
    try {
      const found = this.users.find((user) => user.userId === id);
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(Status.SUCCESS, null, error?.message || error?.stack);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
