import { Category } from 'src/business/category/entities/category.entity';
import { Base } from 'src/common/entities/base';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column()
  updated_by: string;

  @Column()
  created_by: string;

  @Column()
  name: string;

  @OneToMany(() => Category, (category) => category.menu)
  category: Category[];
}
