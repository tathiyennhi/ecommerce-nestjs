// CÁC ROUTE CẦN ROLE|PERMISSION RIÊNG BIỆT -> KHÔNG CẦN THAY ĐỔI CODE KHI CÓ YÊU CẦU THAY ĐỔI ROLE|PERMISSION, CHỈ THAY ĐỔI CẤU HÌNH

import { Base } from "src/common/base-entities/base";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Permission } from "./../../permission/entities/permission.entity";
import { Role } from "./../../role/entities/role.entity";

@Entity()
export class Route extends Base {
  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  route: string;

  @Column()
  method: string; // POST GET PATCH DELETE

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "route_permissions",
    joinColumn: {
      name: "route_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: { name: "permission_id", referencedColumnName: "id" },
  })
  permissions: Permission[];

  @ManyToMany(() => Role)
  @JoinTable({
    name: "route_roles",
    joinColumn: {
      name: "route_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: { name: "role_id", referencedColumnName: "id" },
  })
  roles: Role[];

  @Column()
  created_by: string;

  @Column()
  updated_by: string;
}
