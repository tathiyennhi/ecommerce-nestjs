import { Category } from 'src/business/category/entities/category.entity';
import { Base } from 'src/common/entities/base';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menu extends Base{
  @Column()
  name: string;

  @OneToMany(() => Category, (category) => category.menu)
  category: Category[];
}
