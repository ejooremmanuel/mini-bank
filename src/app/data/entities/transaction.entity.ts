import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./cutomer.entity";
import { Account } from "./account.entity";

export enum TransactionType {
  Withdrawal = "Withdrawal",
  Deposit = "Deposit",
}
enum Status {
  Failed = "Failed",
  Success = "Success",
  Flagged = "Flagged",
  Pending = "Pending",
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: TransactionType;

  @Column({
    type: "double",
  })
  balance: number;

  @Column({
    default: Date.now,
  })
  date: Date;

  @Column({
    type: "double",
  })
  amount: number;
  @Column({
    default: Status.Pending,
  })
  status: Status;

  @ManyToOne(() => Account, (account) => account.transactions, {
    cascade: true,
  })
  account: Account;
}
