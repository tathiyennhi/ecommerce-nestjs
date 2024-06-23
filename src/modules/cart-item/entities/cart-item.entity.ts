import { Base } from "src/common/base-entities/base";
import { Column, Entity, ManyToOne } from "typeorm";
import { Cart } from "src/modules/cart/entities/cart.entity";
import { ChildProduct } from "src/modules/child-product/entities/child-product.entity";

@Entity()
export class CartItem extends Base {
  @ManyToOne(() => Cart, (cart) => cart.cart_items)
  cart: Cart;

  @ManyToOne(() => ChildProduct, (childProduct) => childProduct.cart_items)
  child_product: ChildProduct;

  @Column()
  cart_id: string;

  @Column()
  child_product_id: string;

  @Column()
  quantity: number;

  @Column()
  price_at_adding: number;

  @Column({ nullable: true, default: null })
  tax: number;

  @Column()
  subtotal: number; // quantity * price_at_adding
}
