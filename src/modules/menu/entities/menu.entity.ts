import { Category } from "src/modules/category/entities/category.entity";
import { Base } from "src/common/base-entities/base";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Menu extends Base {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Category, (category) => category.menu)
  categories: Category[];
}
