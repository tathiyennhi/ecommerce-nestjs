import { Menu } from "src/modules/menu/entities/menu.entity";
import { Base } from "src/common/base-entities/base";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ProductType } from "src/modules/product-type/entities/product-type.entity";

@Entity()
export class Category extends Base {
  @Column()
  display_content: string;

  @ManyToOne(() => Menu, (menu) => menu.categories)
  @JoinColumn({ name: "menu_id" })
  menu: Menu;

  @OneToMany(() => ProductType, (i) => i.category)
  product_types: ProductType[];
}
