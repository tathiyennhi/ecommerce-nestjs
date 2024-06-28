import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Category1719168393061 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "category",
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
            name: "menu_id",
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

    await queryRunner.createForeignKey(
      "category",
      new TableForeignKey({
        columnNames: ["menu_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "menu",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("category");
  }
}
