import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./cutomer.entity";
import { Transaction } from "./transaction.entity";

enum AccountType {
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
  })
  balance: number;
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

  @OneToOne(() => Customer, (customer) => customer.accountDetails)
  @JoinColumn()
  customer: Customer;

  @OneToMany(() => Transaction, (transactions) => transactions.account)
  @JoinColumn()
  transactions: Transaction[];
}
