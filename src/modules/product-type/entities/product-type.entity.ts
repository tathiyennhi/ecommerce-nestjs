import { Base } from 'src/common/entities/base';
import { Entity, Column } from 'typeorm';

@Entity()
export class ProductType extends Base {
  @Column()
  category_id: string;

  @Column()
  display_content: string;

  @Column()
  description: string;
}
