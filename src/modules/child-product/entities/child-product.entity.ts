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

  @Column({
    default: 0,
  })
  click_count: number;

  @Column({
    nullable: true,
  })
  sell_off_info: string;

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
  product: Product;
}
