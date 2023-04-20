import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @ManyToOne((type) => Order, { nullable: false })
  order: Order;

  @Column({ nullable: false })
  productId: string;

  @Column({ nullable: false, default: 0 })
  amount: number;

  @Exclude()
  @RelationId((item: OrderItem) => item.order)
  orderId: number;
}
