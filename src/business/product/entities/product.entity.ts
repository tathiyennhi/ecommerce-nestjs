import { Base } from 'src/common/entities/base';
import { Entity, Column } from 'typeorm';

@Entity()
export class Product extends Base {
  @Column()
  name: string;

  @Column()
  product_type_id: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @Column()
  click_count: string;

  @Column()
  remained_qtt: string;

  @Column()
  sell_off_info: string;
}
