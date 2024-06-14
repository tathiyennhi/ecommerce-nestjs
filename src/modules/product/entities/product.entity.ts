import { Base } from 'src/common/base-entities/base';
import { ChildProduct } from 'src/modules/child-product/entities/child-product.entity';
import { ProductType } from 'src/modules/product-type/entities/product-type.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Product extends Base {
  @Column()
  name: string;

  @Column()
  product_type_id: string;

  @Column()
  price: number;

  @Column()
  quantity: number; // = sum of all child product

  @Column()
  click_count: string;

  @Column()
  remained_qtt: string;

  @Column()
  sell_off_info: string; // 1 trong cac san pham con co' giam gia, hoac tat ca deu co giam gia

  @Column()
  default_image: string; // get id from child product list

  @ManyToOne(() => ProductType, (productType) => productType.products)
  product_type: ProductType;

  @OneToMany(() => ChildProduct, (ChildProduct) => ChildProduct.product)
  child_products: ChildProduct[];
}
