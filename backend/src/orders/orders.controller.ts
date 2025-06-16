import { Controller, Get, Post, Param, ParseIntPipe, Patch, Body, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder() {
    return this.ordersService.createOrder();
  }

  @Get()
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOrderById(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string
  ) {
    return this.ordersService.updateStatus(id, status);
  }

  @Delete(':id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.deleteOrder(id);
  }

  @Delete()
  clearOrders() {
    return this.ordersService.clearOrders();
  }
}
