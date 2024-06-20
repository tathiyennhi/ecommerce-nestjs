import { Base } from "src/common/base-entities/base";
import { User } from "src/modules/user/entities/user.entity";
import { Entity, ManyToOne, OneToMany } from "typeorm";
import { CartItem } from "./cart_item.entity";

@Entity()
export class Cart extends Base {
  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cart_items: CartItem[];
}
