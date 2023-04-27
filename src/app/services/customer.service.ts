import { Customer } from "./../data/entities/cutomer.entity";
import { Injectable } from "@matchmakerjs/di";
import { CustomerRequest } from "../dto/request/customer-item.request";
import { EntityManager } from "typeorm";
import { Account, AccountType } from "../data/entities/account.entity";
import { ErrorResponse } from "@matchmakerjs/matchmaker";
import { Transactional } from "@matchmakerjs/matchmaker-typeorm";
import { Address } from "../data/entities/address.entity";
import { Passport } from "../data/entities/passport.entity";
import { PageRequest } from "../dto/request/page-request";

@Injectable()
export class CustomerService {
  constructor(private entityManager: EntityManager) {}
  @Transactional()
  async saveCustomerData(data: CustomerRequest): Promise<Customer> {
    const accountDetails = await this.createAccountNumber();
    const customer = await this.createNewCustomerData(data);
    const address = await this.createAddress(data);
    const passport = await this.createPassport(data);
    customer.accountDetails = [accountDetails];
    customer.address = address;
    customer.passport = passport;

    return this.entityManager.save(customer);
  }
  @Transactional()
  async createAdditionalAccount(
    data: AccountType,
    customerId: number
  ): Promise<Customer> {
    const customer = await this.getCustomerData(customerId);

    const findCustomerAccounts = customer.accountDetails.map((it) => it.type);

    if (findCustomerAccounts.includes(data)) {
      throw new ErrorResponse(400, {
        message: `customer already has ${data} account`,
      });
    }

    const accountDetails = await this.createAccountNumber(data);
    customer.accountDetails = [...customer.accountDetails, accountDetails];

    return this.entityManager.save(customer);
  }
  @Transactional()
  async updateCustomer(
    data: CustomerRequest,
    customerId: number
  ): Promise<number> {
    await this.getCustomerData(customerId);

    await this.entityManager
      .createQueryBuilder(Customer, "customer")
      .update(Customer)
      .set({
        first_name: data.first_name,
        last_name: data.last_name,
      })
      .where("id=:customerId", {
        customerId,
      })
      .execute();

    return customerId;
  }
  @Transactional()
  async getAccountDetails(nuban: number): Promise<Customer> {
    await this.createAccountNumber();
    const accountData = await this.entityManager.findOne(Account, {
      where: {
        nuban,
      },
    });

    if (!accountData) {
      throw new ErrorResponse(404, {
        message:
          "account number provided is not assigned to a customer or not in use",
      });
    }
    const res = await this.entityManager
      .createQueryBuilder(Customer, "customer")
      .leftJoinAndSelect("customer.accountDetails", "accountDetails")
      .where("accountDetails.nuban=:nuban", { nuban })
      .getOne();

    return res;
  }
  @Transactional()
  async getAllCustomers(query: PageRequest): Promise<Customer[]> {
    const res = await this.entityManager
      .createQueryBuilder(Customer, "customer")
      .leftJoinAndSelect("customer.accountDetails", "accountDetails")
      .leftJoinAndSelect("customer.address", "address")
      .leftJoinAndSelect("customer.passport", "passport")
      .skip(query.offset)
      .limit(query.limit)
      .getMany();

    return res;
  }
  @Transactional()
  async getAllCustomersCount(): Promise<number> {
    const res = await this.entityManager
      .createQueryBuilder(Customer, "customer")
      .getCount();

    return res;
  }

  private createAccountNumber = async (
    type: AccountType = AccountType.Savings
  ): Promise<Account> => {
    const bankPrefix = "101";
    const numberOfCustomers = await this.entityManager
      .createQueryBuilder(Customer, "customer")
      .getMany();

    const generatedNumber = `${(numberOfCustomers.length + 1)
      .toString()
      .padStart(7, "0")}`;
    const accountDetails = new Account();
    if (type === AccountType.Savings) {
      accountDetails.limit = 10000000.0;
    } else if (type === AccountType.Corporate) {
      accountDetails.limit = 1000000000.0;
    }
    accountDetails.nuban = parseInt(`${bankPrefix}${generatedNumber}`);
    accountDetails.type = type;

    return accountDetails;
  };
  private createNewCustomerData = async (
    data: CustomerRequest
  ): Promise<Customer> => {
    const customer = new Customer();
    customer.first_name = data.first_name;
    customer.last_name = data.last_name;

    return customer;
  };
  private getCustomerData = async (customerId: number): Promise<Customer> => {
    const customer = await this.entityManager.findOne(Customer, {
      relations: {
        accountDetails: true,
        address: true,
      },
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      throw new ErrorResponse(404, {
        message: "customer not found",
      });
    }

    return customer;
  };

  private createAddress = async (data: CustomerRequest): Promise<Address> => {
    const address = new Address();
    address.city = data.city;
    address.country = data.country;
    address.state = data.state;

    return address;
  };
  private createPassport = async (data: CustomerRequest): Promise<Passport> => {
    const passport = new Passport();
    passport.link =
      "https://firebasestorage.googleapis.com/v0/b/uploader-32424.appspot.com/o/Welcome%20Scan.jpg?alt=media&token=97e74a6d-052b-47c4-a4fb-0294ca4972e8";

    return passport;
  };
}
