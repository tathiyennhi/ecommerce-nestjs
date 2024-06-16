import { Base } from "src/common/base-entities/base";
import { ChildProduct } from "src/modules/child-product/entities/child-product.entity";
import { ProductType } from "src/modules/product-type/entities/product-type.entity";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Product extends Base {
  @Column()
  display_content: string;

  @Column({
    unique: true,
  })
  code: string;

  @Column()
  fabric: string; // chất liệu

  // @Column()
  // image_link: string; // get id from child product list

  // @Column()
  // is_default_image: boolean; // get id from child product list

  @ManyToOne(() => ProductType, (productType) => productType.products)
  product_type: ProductType;

  @OneToMany(() => ChildProduct, (ChildProduct) => ChildProduct.product)
  child_products: ChildProduct[];
}
