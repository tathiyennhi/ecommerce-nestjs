/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CartItemService } from "./cart-item.service";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";

@Controller("cart-item")
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.createOrUpdate(createCartItemDto);
  }

  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cartItemService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") _id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _updateCartItemDto: UpdateCartItemDto,
  ) {
    // return this.cartItemService.updateCartItemInCart(id, updateCartItemDto);
    return true;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cartItemService.remove(id);
  }
}
