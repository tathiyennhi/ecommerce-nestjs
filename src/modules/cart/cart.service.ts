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
      // This app allow user to have only 1 'active' cart

      // user client cung cap co' dung'?
      const foundUser = await this.userService.findById(createCartDto.userId);
      if (!foundUser.data) {
        return new Result(Status.ERROR, null, "User not found");
      }
      // tim gio hang cua user, neu co thong bao gio hang da ton tai
      const foundCart = await this.findActiveCart(createCartDto.userId);
      if (foundCart.data) {
        return new Result(
          Status.ERROR,
          null,
          "User already have a cart, no need to add.",
        );
      }

      // neu chua co, tao gio hang moi
      const neww = await this.repository.create({
        user: foundUser,
      });
      await this.repository.save(neww);
      return new Result(Status.SUCCESS, neww, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message || "Create error");
    }
  }

  async findActiveCart(userId: string): Promise<Result> {
    try {
      const activeCart = await this.repository
        .createQueryBuilder("cart")
        .leftJoinAndSelect("cart.user", "user") // Join only with user to get user information
        .where("cart.status = :status", { status: "ACTIVE" })
        .andWhere("user.id = :userId", { userId })
        .getOne();

      return new Result(Status.SUCCESS, activeCart, null);
    } catch (error) {
      return new Result(
        Status.ERROR,
        null,
        error?.message || "findActiveCart Error",
      );
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

  remove(id: string) {
    return `This action removes a #${id} cart`;
  }
}
