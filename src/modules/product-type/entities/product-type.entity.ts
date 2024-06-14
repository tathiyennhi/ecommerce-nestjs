import { Base } from 'src/common/base-entities/base';
import { Category } from 'src/modules/category/entities/category.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ProductType extends Base {
  // @Column()
  // category_id: string;

  @ManyToOne(() => Category, (i) => i.product_types)
  category: Category;

  @OneToMany(() => Product, (product) => product.product_type)
  products: Product[];

  @Column()
  display_content: string;

  @Column()
  description: string;
}
