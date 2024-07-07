import { Base } from "src/common/base-entities/base";
import { Permission } from "src/modules/permission/entities/permission.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class Admin extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string; // display name

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  @Column({ default: null })
  picture: string;

  @Column()
  password: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "admin_permissions",
    joinColumn: {
      name: "admin_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: { name: "permission_id", referencedColumnName: "id" },
  })
  permissions: Permission[];

  @ManyToMany(() => Role)
  @JoinTable({
    name: "admin_roles",
    joinColumn: {
      name: "admin_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: { name: "role_id", referencedColumnName: "id" },
  })
  roles: Role[];
}
