import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { Product } from './products/product.entity';
import { Order } from './orders/order.entity';
import { CartItem } from './cart/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Product, Order, CartItem],
      synchronize: true,
    }),
    ProductsModule,
    OrdersModule,
    CartModule,
  ],
})
export class AppModule {}
