import { Base } from "src/common/base-entities/base";
import { PrimaryGeneratedColumn, Column } from "typeorm";

export class ChildProduct extends Base{
  @Column()
  name: string;

  @Column()
  product_id: string;

  @Column()
  price: number;

  @Column()
  color: number;

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

  @Column()
  size: string;
}
