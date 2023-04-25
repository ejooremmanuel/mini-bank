import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./cutomer.entity";

@Entity()
export class Passport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @CreateDateColumn({ default: Date.now })
  date: Date;

  @OneToOne(() => Customer, (customer) => customer.passport)
  @JoinColumn()
  customer: Customer;
}
