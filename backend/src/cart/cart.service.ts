import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CartItem } from './interfaces/cart-item.interface';

@Injectable()
export class CartService {
  private cart: CartItem[] = [];

  constructor(private readonly productsService: ProductsService) {}

  async addToCart(productId: string, quantity: number = 1) {
    const existingItem = this.cart.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const product = await this.productsService.getProductById(productId);
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      this.cart.push({
        productId,
        quantity,
        product,
      });
    }

    return { message: 'Product added to cart' };
  }

  getCart(): { items: CartItem[]; total: number } {
    return {
      items: this.cart,
      total: this.getTotal(),
    };
  }

  removeFromCart(productId: string) {
    const index = this.cart.findIndex((item) => item.productId === productId);
    if (index === -1) {
      throw new NotFoundException(`Product with ID ${productId} not found in cart`);
    }

    this.cart.splice(index, 1);
    return { message: 'Product removed from cart' };
  }

  clearCart() {
    this.cart = [];
    return { message: 'Cart cleared' };
  }

  private getTotal() {
    return this.cart.reduce((sum, item) => {
      return sum + parseFloat(item.product.preco) * item.quantity;
    }, 0);
  }
}
