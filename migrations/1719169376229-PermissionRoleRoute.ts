import { MigrationInterface, QueryRunner } from "typeorm";

export class PermissionRoleRoute1719169376228 implements MigrationInterface {
  name = "PermissionRoleRoute1719169376228";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "permission" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" character varying,
        "created_by" character varying NOT NULL,
        "updated_by" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_permission_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "role" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" character varying,
        "created_by" character varying NOT NULL,
        "updated_by" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_role_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "route" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying,
        "method" character varying,
        "description" character varying,
        "route" character varying NOT NULL,
        "created_by" character varying NOT NULL,
        "updated_by" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_route_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "route_permissions" (
        "route_id" uuid NOT NULL,
        "permission_id" uuid NOT NULL,
        CONSTRAINT "PK_route_permissions" PRIMARY KEY ("route_id", "permission_id"),
        CONSTRAINT "FK_route_permissions_route" FOREIGN KEY ("route_id") REFERENCES "route"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_route_permissions_permission" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "route_roles" (
        "route_id" uuid NOT NULL,
        "role_id" uuid NOT NULL,
        CONSTRAINT "PK_route_roles" PRIMARY KEY ("route_id", "role_id"),
        CONSTRAINT "FK_route_roles_route" FOREIGN KEY ("route_id") REFERENCES "route"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_route_roles_role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "route_roles"`);
    await queryRunner.query(`DROP TABLE "route_permissions"`);
    await queryRunner.query(`DROP TABLE "route"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "permission"`);
  }
}
