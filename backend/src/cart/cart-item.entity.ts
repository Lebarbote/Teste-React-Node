import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @Column()
  nome: string;

  @Column()
  preco: string;

  @Column()
  quantity: number;
}
