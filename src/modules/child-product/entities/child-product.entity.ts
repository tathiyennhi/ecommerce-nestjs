import { Base } from "src/common/base-entities/base";
import { CartItem } from "src/modules/cart-item/entities/cart-item.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class ChildProduct extends Base {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  color: string; // @TODO: table for color

  @Column()
  size: string; // @TODO: table for size and descripton|note for choosing size

  @Column()
  quantity: number;

  @Column({
    default: 0,
  })
  click_count: number;

  @Column({
    nullable: true,
  })
  sell_off_info: string; // @TODO: table for sell_off_info

  @Column({
    nullable: true,
  })
  image_link: string;

  @Column({
    nullable: true,
    default: false,
  })
  is_default_product: boolean;

  @ManyToOne(() => Product, (product) => product.child_products)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @OneToMany(() => CartItem, (cartItem) => cartItem.child_product)
  cart_items: CartItem[];
}
