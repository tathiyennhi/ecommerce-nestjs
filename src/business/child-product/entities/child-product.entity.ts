import { PrimaryGeneratedColumn, Column } from "typeorm";

export class ChildProduct {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  product_id: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @Column()
  click_count: string;

  @Column()
  image_link: string;

  @Column()
  is_default_image: string;

  @Column()
  size: string;
}
