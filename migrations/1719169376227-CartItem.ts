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
          {
            name: "quantity",
            type: "integer",
          },
          {
            name: "price_at_adding",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "tax",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: true,
            default: null,
          },
          {
            name: "subtotal",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "version",
            type: "int",
            default: 1,
          },
          {
            name: "cart_id",
            type: "uuid",
          },
          {
            name: "child_product_id",
            type: "uuid",
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
        },
        {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
        }
        ],
      }),
      true,
    );

    // Add foreign key constraints
    await queryRunner.createForeignKey(
      "cart_item",
      new TableForeignKey({
        columnNames: ["cart_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "cart",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "cart_item",
      new TableForeignKey({
        columnNames: ["child_product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "child_product",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cart_item");
  }
}
