import { Base } from "src/common/base-entities/base";
import { Cart } from "src/modules/cart/entities/cart.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class User extends Base {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ default: null })
  picture: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
