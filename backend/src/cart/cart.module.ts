import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartItem } from './cart-item.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), ProductsModule],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
