import { Base } from "src/common/base-entities/base";
import { Column, Entity } from "typeorm";

@Entity()
export class Role extends Base {
  @Column()
  name: string;

  @Column()
  created_by: string;

  @Column()
  updated_by: string;
}
