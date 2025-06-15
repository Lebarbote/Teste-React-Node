import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-json')
  items: any[]; 

  @Column()
  total: number;

  @Column()
  createdAt: Date;
}
