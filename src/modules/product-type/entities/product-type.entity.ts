import { Base } from 'src/common/base-entities/base';
import { Category } from 'src/modules/category/entities/category.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class ProductType extends Base {
  // @Column()
  // category_id: string;

  @ManyToOne(() => Category, (i) => i.product_type)
  category: Category;

  @Column()
  display_content: string;

  @Column()
  description: string;
}
