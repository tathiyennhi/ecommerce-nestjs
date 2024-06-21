import { Injectable } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { Cart } from "./entities/cart.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "../user/users.service";
import { Status } from "src/common/enums/service-status-code.enum";
import { Result } from "src/common/service-result/result";

@Injectable()
export class CartService {
  constructor(
    private userService: UsersService,
    @InjectRepository(Cart)
    private repository: Repository<Cart>,
  ) {}

  async create(createCartDto: CreateCartDto) {
    try {
      // 1 user chi co 1 gio hang tai 1 thoi diem voi cai app nay`
      // this app allow user to have only 1 'active' cart at everytime

      // user client cung cap co' dung'?
      const foundUser = await this.userService.findById(createCartDto.userId);
      if (!foundUser.data) {
        return new Result(Status.ERROR, null, "User not found");
      }
      // tim gio hang cua user
      // neu co thong bao gio hang da ton tai

      // neu chua co, tao gio hang moi
      const neww = await this.repository.create({
        user: foundUser,
      });

      await this.repository.save(neww);
      return new Result(Status.SUCCESS, neww, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message || "abc");
    }
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
