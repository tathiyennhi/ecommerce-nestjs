import { Base } from "src/common/base-entities/base";
import { Cart } from "src/modules/cart/entities/cart.entity";
import { Column, JoinColumn, OneToOne, VersionColumn } from "typeorm";

export class Order extends Base {
  @Column()
  status: string; // thành công || hủy đơn || đang giao || chờ thanh toán @TODO: table for status

  @Column()
  payment_method: string; // cash || momo || bank || COD @TODO: table for payment method

  @Column()
  shipping_method: string; // @TODO: table for shipping method

  @Column({ nullable: true })
  voucher: string;

  @Column()
  total_value: number;

  @VersionColumn()
  version: number;

  @OneToOne(() => Cart)
  @JoinColumn({ name: "cart_id" })
  cart: Cart;
}
