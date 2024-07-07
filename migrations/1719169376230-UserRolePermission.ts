import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRolePermission1719169376230 implements MigrationInterface {
  name = "UserRolePermission1719169376230";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "admin" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying NOT NULL UNIQUE,
        "name" character varying NOT NULL,
        "picture" character varying DEFAULT null,
        "password" character varying NOT NULL,
        "description" character varying,
        "created_by" character varying NOT NULL,
        "updated_by" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_admin_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "admin_permissions" (
        "admin_id" uuid NOT NULL,
        "permission_id" uuid NOT NULL,
        CONSTRAINT "PK_admin_permissions" PRIMARY KEY ("admin_id", "permission_id"),
        CONSTRAINT "FK_admin_permissions_admin" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_admin_permissions_permission" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "admin_roles" (
        "admin_id" uuid NOT NULL,
        "role_id" uuid NOT NULL,
        CONSTRAINT "PK_admin_roles" PRIMARY KEY ("admin_id", "role_id"),
        CONSTRAINT "FK_admin_roles_admin" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_admin_roles_role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "admin_roles"`);
    await queryRunner.query(`DROP TABLE "admin_permissions"`);
    await queryRunner.query(`DROP TABLE "admin"`);
  }
}
