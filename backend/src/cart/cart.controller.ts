import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Body() body: AddToCartDto) {
    return this.cartService.addToCart(body.productId, body.quantity);
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
