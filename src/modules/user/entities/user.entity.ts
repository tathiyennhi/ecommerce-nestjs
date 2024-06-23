import { Base } from "src/common/base-entities/base";
import { Cart } from "src/modules/cart/entities/cart.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class User extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ default: null })
  picture: string;

  @Column({ default: null })
  password: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @Column({ default: "google-login" })
  create_via: string; // local
}
