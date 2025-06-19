//Data Transfer Object
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class AddToCartDto {
  productId: string;
  quantity: number;
}
