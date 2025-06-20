import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  preco: string;

  @Column()
  imagem: string;

  @Column()
  origem: string;

  @Column()
  quantity: number;
}
