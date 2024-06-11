import { Menu } from "src/modules/menu/entities/menu.entity";
import { Base } from "src/common/base-entities/base";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ProductType } from "src/modules/product-type/entities/product-type.entity";

@Entity()
export class Category extends Base {  
    // @Column()
    // menu_id: string;
    
    @Column()
    display_content: string;
  
    @Column()
    description: string;

    @ManyToOne(() => Menu, (menu) => menu.categories)
    menu: Menu;

    @OneToMany(() => ProductType, (i) => i.category)
    product_type: ProductType[];
}
