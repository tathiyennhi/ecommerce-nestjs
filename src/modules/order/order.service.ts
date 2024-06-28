import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DataSource, Repository } from 'typeorm';
import { Result } from 'src/common/service-result/result';
import { Status } from 'src/common/enums/service-status-code.enum';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from '../cart/cart.service';
import { ChildProductService } from '../child-product/child-product.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataSource: DataSource, 
    @InjectRepository(Order)
    private repository: Repository<Order>,
    private cartService: CartService,
    private childProductService: ChildProductService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Result> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { cartId, shippingMethod, paymentMethod, voucherId, userId } = createOrderDto;

      // tìm cart
      const foundCart = await this.cartService.findActiveCart(userId);
      if (!foundCart.data) {
        await queryRunner.rollbackTransaction();
        return new Result(Status.ERROR, null, "Cart invalid")
      }

      // check cartId vs foundCart.cart_id
      if (cartId !== foundCart.data.cart_id) {
        await queryRunner.rollbackTransaction();
        return new Result(Status.ERROR, null, "Create order ERROR, cartId is wrong, rollback"); 
      }

      // danh sách sản phẩm trong cart
      const cartItems = await this.cartService.findCartItems(cartId);

      const itemQuantityStatus:any[] = [];
      // số lượng sản phẩm trong kho
      for (const cartItem of cartItems.data) {
        const childProduct = await this.childProductService.findOne(cartItem.data.child_product.id);
        if (!childProduct.data) {
          return new Result(Status.ERROR, null, "Create order ERROR, there are some error when getting cartItem, rollback" + childProduct.message); 
        }
        const quantityInWarehouse = childProduct.data.quantity;
        if (quantityInWarehouse < cartItem.data.quantity) {
          itemQuantityStatus.push({cartItem, availableQuantity: quantityInWarehouse})
        }
      }

      // danh sách sản phẩm trong kho còn đủ cho đơn hàng này không, không đủ thì làm sao?
      // -> thông báo số lượng còn lại không đủ, user có muốn chỉnh lại số lượng không
      if (itemQuantityStatus.length > 0) {
        await queryRunner.rollbackTransaction();
        return new Result(Status.ERROR, null, "Shop hiện tại không đủ số lượng hàng bạn cần, bạn cập nhật lại giỏ hàng giúp shop với nha, hoặc liên hệ qua kênh chat hoặc sdt để được hỗ trợ, đã phiền bạn rồi, shop xin lỗi nha."); 
      }

      // số sản phẩm trong kho = sản phẩm trong kho - số lượng từ giỏ hàng
      for (const cartItem of cartItems.data) {
        const updateQttRes = await this.childProductService.updateQuantity(cartItem.data.child_product.id, cartItem.data.child_product.id - cartItem.data.quantity);
        if (!updateQttRes.data) {
          await queryRunner.rollbackTransaction();
          // @TODO: add Logger
          return new Result(Status.ERROR, null, "Lỗi khi cập nhật số lượng hàng trong kho | " + updateQttRes.message);
        }
      }

      // @TODO: chờ thanh toán?
      // quản lý danh sách trạng thái đơn hàng?

      // chuyển trạng thái của cart từ active sang processing
      const updateCartRes = await this.cartService.updateStatus({cartId, status: "PROCESSING"});
      if (updateCartRes.status === Status.ERROR) {
        await queryRunner.rollbackTransaction();
          // @TODO: add Logger
          return new Result(Status.ERROR, null, "Lỗi khi cập nhật trạng thái giỏ hàng");
      }
      // tạo order
      const neww = this.repository.create({payment_method: paymentMethod, shipping_method: shippingMethod, cart: foundCart.data});
      await this.repository.save(neww);
      return new Result(Status.SUCCESS, neww, null);
    } catch(error) {
      await queryRunner.rollbackTransaction();
      return new Result(Status.ERROR, null, error?.message || "Create order ERROR, rollback"); 
    } finally {
      await queryRunner.release();
    }
  }

  async getOrders(page: number, itemsPerPage: number) {
    try {
      // Tính toán số bản ghi cần bỏ qua
      const skip = (page - 1) * itemsPerPage;

      // Truy vấn lấy tổng số bản ghi
      const [orders, totalItems] = await this.repository.findAndCount({
        skip,
        take: itemsPerPage,
        order: {
          created_at: "DESC", // Sắp xếp theo thời gian tạo (giả sử bạn có trường 'createdAt')
        },
      });

      // Tính toán tổng số trang
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      // Tạo đối tượng chứa thông tin kết quả và phân trang
      const result = {
        orders,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          itemsPerPage,
        },
      };

      return new Result(Status.SUCCESS, result, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error.message);
    }
  }

  findOne(id: number) {
    // return `This action returns a #${id} order`;
    throw new NotImplementedException();
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    // return `This action updates a #${id} order`;
    throw new NotImplementedException();
  }

  remove(id: number) {
    // return `This action removes a #${id} order`;
    throw new NotImplementedException();
  }
}
