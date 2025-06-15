//Data Transfer Object
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}
