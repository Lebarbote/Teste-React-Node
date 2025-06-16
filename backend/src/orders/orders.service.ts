import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly cartService: CartService,
  ) {}

  async createOrder() {
    const cart = await this.cartService.getCart();

    if (cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    const order = this.orderRepository.create({
      items: cart.items,
      total: cart.total,
      createdAt: new Date(),
    });

    await this.orderRepository.save(order);
    this.cartService.clearCart(); 
    return order;
  }

  async getAllOrders() {
    return this.orderRepository.find();
  }

  async getOrderById(id: number) {
    return this.orderRepository.findOneBy({ id });
  }

  async updateStatus(id: number, status: string) {
    const order = await this.orderRepository.findOne({ where: { id } });
  
    if (!order) {
      throw new Error('Order not found');
    }
  
    order.status = status;
    return this.orderRepository.save(order);
  }
  
  async deleteOrder(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
  
    if (!order) {
      throw new NotFoundException('Order not found');
    }
  
    await this.orderRepository.remove(order);
  
    return { message: `Order ${id} deleted successfully` };
  }

  async clearOrders() {
    await this.orderRepository.clear();
  }
  
  
}
