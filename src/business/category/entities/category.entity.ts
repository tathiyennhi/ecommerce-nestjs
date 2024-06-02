import { Menu } from "src/business/menu/entities/menu.entity";
import { Base } from "src/common/entities/base";
import { Column, ManyToOne } from "typeorm";

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
