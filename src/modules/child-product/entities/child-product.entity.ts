import { Base } from "src/common/base-entities/base";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class ChildProduct extends Base {
  @Column()
  name: string;

  @Column()
  product_id: string;

  @Column()
  price: number;

  @Column()
  color: number;

  @Column()
  size: string;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @Column()
  click_count: string;

  @Column()
  image_link: string;

  // @Column()
  // is_default_image: string;
  @ManyToOne(() => Product, (product) => product.child_products)
  product: Product;
}
