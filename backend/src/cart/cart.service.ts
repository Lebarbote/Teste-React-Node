import { Injectable } from '@nestjs/common';
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

  async getCart() {
    const items = await this.cartRepository.find();
    const total = items.reduce(
      (acc, item) => acc + Number(item.preco) * item.quantity,
      0,
    );
    return { items, total };
  }

  async addToCart(productId: string, quantity: number) {
    const product = await this.productsService.getProductById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    const existingItem = await this.cartRepository.findOneBy({
      productId,
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      return this.cartRepository.save(existingItem);
    }

    const newItem = this.cartRepository.create({
      productId: product.id,
      nome: product.nome,
      preco: product.preco,
      quantity,
    });

    return this.cartRepository.save(newItem);
  }

  async removeFromCart(id: string) {
    await this.cartRepository.delete({ productId: id });
    return { message: 'Item removed from cart' };
  }

  async clearCart() {
    await this.cartRepository.clear();
    return { message: 'Cart cleared' };
  }
}
