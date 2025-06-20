import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly productsService: ProductsService,
  ) {}

  async addToCart(productId: string, quantity: number) {
    const product = await this.productsService.getProductById(productId);

    const existingItem = await this.cartItemRepository.findOneBy({
      productId,
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      return this.cartItemRepository.save(existingItem);
    }

    const newItem = this.cartItemRepository.create({
      productId: product.id,
      nome: product.nome,
      descricao: product.descricao,
      preco: product.preco,
      imagem: product.imagem,
      origem: product.origem,
      quantity,
    });

    return this.cartItemRepository.save(newItem);
  }

  async getCart() {
    const items = await this.cartItemRepository.find();

    const total = items.reduce(
      (acc, item) => acc + Number(item.preco) * item.quantity,
      0,
    );

    return {
      items,
      total,
    };
  }

  async removeFromCart(id: string) {
    const item = await this.cartItemRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException('Item not found in cart');
    }

    await this.cartItemRepository.remove(item);

    return { message: 'Item removed from cart' };
  }

  async clearCart() {
    await this.cartItemRepository.clear();
    return { message: 'Cart cleared' };
  }
}
