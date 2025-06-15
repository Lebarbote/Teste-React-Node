import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:id')
  addToCart(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.addToCart(id, quantity);
  }

  @Get()
  getCart() {
    return this.cartService.getCart();
  }

  @Delete('remove/:id')
  removeFromCart(@Param('id') id: string) {
    return this.cartService.removeFromCart(id);
  }

  @Delete('clear')
  clearCart() {
    return this.cartService.clearCart();
  }
}
