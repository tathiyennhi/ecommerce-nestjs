import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class ChildProduct1719168757980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "child_product",
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
            name: "name",
            type: "varchar",
          },
          {
            name: "price",
            type: "decimal",
          },
          {
            name: "color",
            type: "varchar",
          },
          {
            name: "size",
            type: "varchar",
          },
          {
            name: "quantity",
            type: "int",
          },
          {
            name: "click_count",
            type: "int",
            default: 0,
          },
          {
            name: "sell_off_info",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "image_link",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_default_product",
            type: "boolean",
            default: false,
          },
          {
            name: "product_id",
            type: "uuid",
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      "child_product",
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "product",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("child_product");
  }
}
