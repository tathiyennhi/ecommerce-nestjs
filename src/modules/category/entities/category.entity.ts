import { Menu } from "src/modules/menu/entities/menu.entity";
import { Base } from "src/common/base-entities/base";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Category extends Base {  
    // @Column()
    // menu_id: string;
    
    @Column()
    display_content: string;
  
    @Column()
    description: string;

    @ManyToOne(() => Menu, (menu) => menu.category)
    menu: Menu;
}
