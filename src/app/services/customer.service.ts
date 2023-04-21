import { Injectable } from "@matchmakerjs/di";
import { CustomerRequest } from "../dto/request/customer-item.request";
import { EntityManager } from "typeorm";
import { Customer } from "../data/entities/cutomer.entity";
import { Account } from "../data/entities/account.entity";

@Injectable()
export class CustomerService {
  constructor(private entityManager: EntityManager) {}
  createCustomer(data: CustomerRequest): Promise<Customer> {
    const accountDetails = Object.assign(new Account(), {
      nuban: parseInt(
        Math.floor(Math.random() * Date.now())
          .toString()
          .substring(0, 10)
      ),
    } as Account);
    const customer = Object.assign(new Customer(), { ...data, accountDetails });
    customer.accountDetails.customer = customer;
    return this.entityManager.save(customer);
  }
  async getAccountDetails(data: number): Promise<Customer> {
    const res = await this.entityManager
      .createQueryBuilder(Customer, "customer")
      .leftJoinAndSelect("customer.accountDetails", "accountDetails")
      .where("accountDetails.nuban=:nuban", { nuban: data })
      .getOne();

    return res;
  }
}
