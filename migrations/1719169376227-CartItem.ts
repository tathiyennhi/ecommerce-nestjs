import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CartItem1719169376227 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cart_item",
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
          // {
          //   name: "cart_id",
          //   type: "uuid",
          // },
          // {
          //   name: "child_product_id",
          //   type: "uuid",
          // },
          {
            name: "quantity",
            type: "int",
          },
          {
            name: "price_at_adding",
            type: "decimal",
          },
          {
            name: "tax",
            type: "decimal",
            isNullable: true,
            default: null,
          },
          {
            name: "subtotal",
            type: "decimal",
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys("cart_item", [
      new TableForeignKey({
        columnNames: ["cart_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "cart",
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["child_product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "child_product",
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cart_item");
  }
}
