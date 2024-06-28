import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateOrderTable1719169376228 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tạo bảng Order
        await queryRunner.createTable(new Table({
            name: 'order',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'status',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'payment_method',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'shipping_method',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'voucher',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'total_value',
                    type: 'numeric',
                    isNullable: false,
                },
                {
                    name: 'version',
                    type: 'int',
                    isNullable: false,
                    default: 1,
                },
                {
                    name: 'cart_id',
                    type: 'uuid',
                    isNullable: false,
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
            ]
        }), true);

        // Thêm khóa ngoại từ Order tới Cart
        await queryRunner.createForeignKey('order', new TableForeignKey({
            columnNames: ['cart_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cart',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Hủy bỏ khóa ngoại trước khi xóa bảng
        const table = await queryRunner.getTable('order');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('cart_id') !== -1);
        await queryRunner.dropForeignKey('order', foreignKey);

        // Xóa bảng Order
        await queryRunner.dropTable('order');
    }
}
