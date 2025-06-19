import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-json')
  items: {
    productId: string;
    nome: string;
    preco: string;
    quantity: number;
  }[];

  @Column('float')
  total: number;

  @Column()
  status: string = 'pending';

  @Column()
  createdAt: Date;
}

