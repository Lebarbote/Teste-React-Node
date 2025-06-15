import { Injectable } from '@nestjs/common';
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
}
