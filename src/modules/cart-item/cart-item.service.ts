import { Injectable } from "@nestjs/common";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { CartItem } from "./entities/cart-item.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";
import { UsersService } from "../user/users.service";
import { ChildProductService } from "../child-product/child-product.service";
import { CreateCartDto } from "../cart/dto/create-cart.dto";
import { CartService } from "../cart/cart.service";
import { ChildProduct } from "../child-product/entities/child-product.entity";

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private repository: Repository<CartItem>,
    private userService: UsersService,
    private cartService: CartService,
    private childProductService: ChildProductService,
  ) {}

  // @ TODO: kiểm tra token đi kèm có phải quyền truy cập giỏ hàng của user này không --> kiểm tra userId và thông tin từ token do client cung cấp có giống nhau không
  async createOrUpdate(createCartItemDto: CreateCartItemDto): Promise<Result> {
    try {
      const { childProductId, cartId, quantity, userId } = createCartItemDto;

      const foundChildProduct =
        await this.childProductService.findOne(childProductId);
      if (!foundChildProduct.data) {
        return new Result(Status.ERROR, null, "Product not found");
      }

      // @TODO: kiem tra số lượng hàng con` đủ không, không đủ thi` bao' gi`? Có trừ số lượng hàng trong kho ở bước tạo này không?
      // @TODO: Tình huống nhiều thiết bị truy cập vào 1 tài khoản và update giỏ hàng đồng thời?

      // tim gio hang
      const foundCart = await this.cartService.findActiveCart(userId);
      if (!foundCart.data) {
        // Chưa có giỏ hàng thì tạo mới giỏ hàng ở đây
        const createCartDto = new CreateCartDto();
        createCartDto.userId = userId;
        const newCart = await this.cartService.create(createCartDto);
        if (!newCart.data) {
          return new Result(
            Status.ERROR,
            null,
            "There are some errors when creating cart, please try again",
          );
        }
        foundCart.data = newCart;
      } else {
        // kiểm tra hàng trong đó có trùng với món hàng vừa được thêm vào không, nếu trùng thì số lượng cần được update lại, ĐÃ CÓ GIỎ HÀNG RỒI,
        const updateCartItem = await this.updateCartItemInCart(
          cartId,
          quantity,
          foundChildProduct.data,
        );
        if (updateCartItem.data) {
          return new Result(Status.SUCCESS, updateCartItem, null);
        }
      }

      // item chưa có trong giỏ hàng thì tạo mới
      const neww = this.repository.create({
        cart: foundCart.data,
        child_product: foundChildProduct.data,
        quantity,
        price_at_adding: foundChildProduct.data.price,
        subtotal: foundChildProduct.data.price * quantity,
        cart_id: cartId,
        child_product_id: childProductId,
      });
      await this.repository.save(neww);
      return new Result(Status.SUCCESS, neww, null);
    } catch (error) {
      return new Result(
        Status.ERROR,
        null,
        error?.message || "Create CartItem ERROR",
      );
    }
  }

  async updateCartItemInCart(
    cartId: string,
    quantity: number,
    childProduct: ChildProduct,
  ) {
    try {
      // get all items in cart
      const itemsInCart = await this.cartService.findCartItems(cartId);

      // nếu đã có giỏ hàng rồi, kiểm tra hàng trong đó có trùng với món hàng vừa được thêm vào không, nếu trùng thì số lượng cần được update lại
      const itemExistedInCart = this.checkExisted(
        itemsInCart.data,
        childProduct.id,
      );

      if (itemExistedInCart) {
        // update quantity and return
        itemExistedInCart.quantity = quantity;
        itemExistedInCart.subtotal = quantity * childProduct.price;
        await this.repository.save(itemExistedInCart);
        return new Result(Status.SUCCESS, itemExistedInCart, null);
      }
      return new Result(Status.ERROR, null, "Cart item not found to update");
    } catch (error) {
      return new Result(
        Status.ERROR,
        null,
        error?.message || "Cart item update ERRROR",
      );
    }
  }

  checkExisted(itemsInCart: CartItem[], childProductId: string) {
    return itemsInCart.find((item) => item.child_product.id === childProductId);
  }

  findAll() {
    return `This action returns all cartItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  remove(id: string) {
    return `This action removes a #${id} cartItem`;
  }
}
