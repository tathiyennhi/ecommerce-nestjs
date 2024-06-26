import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1719169247555 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "picture",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "create_via",
            type: "varchar",
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
