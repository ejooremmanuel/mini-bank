import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { Address } from "./address.entity";
import { Passport } from "./passport.entity";

@Entity("customer")
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;
  @Column()
  last_name: string;

  @OneToOne(() => Address, (customer) => customer.customer, {
    cascade: true,
  })
  address: Address;
  @OneToOne(() => Passport, (passport) => passport.customer, {
    cascade: true,
  })
  passport: Passport;

  @OneToMany(() => Account, (account) => account.customer, {
    onUpdate: "CASCADE",
    cascade: true,
  })
  accountDetails: Account[];
}
