import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepository: Repository<CartItem>,
    private readonly productsService: ProductsService,
  ) {}

  async addToCart(productId: string, quantity: number) {
    const existingItem = await this.cartRepository.findOneBy({ productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await this.cartRepository.save(existingItem);
    } else {
      const product = await this.productsService.getProductById(productId);
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      const cartItem = this.cartRepository.create({
        productId,
        quantity,
        product,
      });

      await this.cartRepository.save(cartItem);
    }

    return { message: 'Product added to cart' };
  }

  async getCart() {
    const items = await this.cartRepository.find();
    const total = items.reduce(
      (sum, item) => sum + parseFloat(item.product.preco) * item.quantity,
      0,
    );

    return {
      items,
      total,
    };
  }

  async removeFromCart(productId: string) {
    const item = await this.cartRepository.findOneBy({ productId });
    if (!item) {
      throw new NotFoundException(
        `Product with ID ${productId} not found in cart`,
      );
    }

    await this.cartRepository.remove(item);
    return { message: 'Product removed from cart' };
  }

  async clearCart() {
    await this.cartRepository.clear();
    return { message: 'Cart cleared' };
  }
}
