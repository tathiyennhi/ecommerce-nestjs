import { Base } from "src/common/base-entities/base";
import { ChildProduct } from "src/modules/child-product/entities/child-product.entity";
import { ProductType } from "src/modules/product-type/entities/product-type.entity";
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity()
export class Product extends Base {
  @Column()
  display_content: string;

  @Column({
    unique: true,
  })
  code: string;

  @Column()
  fabric: string; // chất liệu @TODO: table for fabric

  @ManyToOne(() => ProductType, (productType) => productType.products)
  @JoinColumn({ name: "product_type_id" })
  product_type: ProductType;

  @OneToMany(() => ChildProduct, (ChildProduct) => ChildProduct.product)
  child_products: ChildProduct[];
}
