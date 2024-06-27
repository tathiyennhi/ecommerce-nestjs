import { Base } from "src/common/base-entities/base";
import { CartItem } from "src/modules/cart-item/entities/cart-item.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Cart extends Base {
  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cart_items: CartItem[];

  @Column({ default: "ACTIVE" })
  status: string; // ACTIVE || DONE
}
