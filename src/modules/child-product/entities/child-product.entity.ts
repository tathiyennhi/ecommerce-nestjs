import { Base } from "src/common/base-entities/base";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class ChildProduct extends Base {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  color: string;

  @Column()
  size: string;

  @Column()
  quantity: number;

  @Column()
  click_count: number;

  @Column()
  sell_off_info: string;

  @Column()
  image_link: string;

  @Column()
  is_default_product: string;

  @ManyToOne(() => Product, (product) => product.child_products)
  product: Product;
}
