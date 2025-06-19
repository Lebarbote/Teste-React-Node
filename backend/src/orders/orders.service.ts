import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(items: any[], total: number) {
    if (!items || items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const order = this.orderRepository.create({
      items,
      total,
      createdAt: new Date(),
    });

    await this.orderRepository.save(order);
    return order;
  }

  async getAllOrders() {
    return this.orderRepository.find();
  }

  async getOrderById(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async updateStatus(id: number, status: string) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = status;
    return this.orderRepository.save(order);
  }

  async deleteOrder(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.orderRepository.remove(order);
    return { message: `Order ${id} deleted successfully` };
  }

  async clearOrders() {
    await this.orderRepository.clear();
    return { message: 'All orders cleared' };
  }
}
