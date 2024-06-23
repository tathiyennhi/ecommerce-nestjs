import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Product1719168574210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
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
            name: "display_content",
            type: "varchar",
          },
          {
            name: "code",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "fabric",
            type: "varchar",
          },
          {
            name: "product_type_id",
            type: "uuid",
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      "product",
      new TableForeignKey({
        columnNames: ["product_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "product_type",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product");
  }
}
