import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./cutomer.entity";
import { Transaction } from "./transaction.entity";

export enum AccountType {
  Savings = "Savings",
  Corporate = "Corporate",
}

@Entity("account")
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    enum: AccountType,
    default: AccountType.Savings,
  })
  type: string;
  @Column({
    default: 0,
    type: "double",
  })
  currentBalance: number;
  @Column({
    default: Date.now,
  })
  dateCreated: Date;

  @Column({
    nullable: false,
  })
  nuban: number;
  @Column({ nullable: true })
  limit: number;

  @ManyToOne(() => Customer, (customer) => customer.accountDetails, {
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  customer: Customer;

  @OneToMany(() => Transaction, (transactions) => transactions.account)
  @JoinColumn()
  transactions: Transaction[];
}
