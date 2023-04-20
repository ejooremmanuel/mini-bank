import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderItem } from "./order-item.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false })
  customerId: string;

  @Column({ nullable: false })
  createdBy: string;

  items: OrderItem[];
}
