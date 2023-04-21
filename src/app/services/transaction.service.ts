import { Injectable } from "@matchmakerjs/di";
import { EntityManager } from "typeorm";
import { Transaction } from "../data/entities/transaction.entity";
import { TransactionRequest } from "../dto/request/transaction.request";
import { Account } from "../data/entities/account.entity";
import { ErrorResponse } from "@matchmakerjs/matchmaker";

@Injectable()
export class TransactionService {
  constructor(private entityManager: EntityManager) {}

  async createDepositTransaction(
    data: TransactionRequest
  ): Promise<Transaction> {
    const accountData = await this.entityManager.findOne(Account, {
      where: {
        nuban: data.nuban,
      },
    });

    if (!accountData) {
      throw new ErrorResponse(404, {
        message:
          "account number provided is not assigned to a customer or not in use",
      });
    }

    accountData.balance += data.amount;

    const transaction = Object.assign(new Transaction(), {
      account: accountData,
      ...data,
    });

    return this.entityManager.save(transaction);
  }
  async createWithDrawTransaction(
    data: TransactionRequest
  ): Promise<Transaction> {
    const accountData = await this.entityManager.findOne(Account, {
      where: {
        nuban: data.nuban,
      },
    });

    if (!accountData) {
      throw new ErrorResponse(404, {
        message:
          "account number provided is not assigned to a customer or not in use",
      });
    }

    if (accountData.balance === 0 || accountData.balance < data.amount) {
      throw new ErrorResponse(400, {
        message: "balance insufficient",
      });
    }

    accountData.balance -= data.amount;

    const transaction = Object.assign(new Transaction(), {
      account: accountData,
      ...data,
    });

    return this.entityManager.save(transaction);
  }

  async getAccountTransactions(nuban: number): Promise<Account> {
    const transactions = this.entityManager
      .createQueryBuilder(Account, "account")
      .leftJoinAndSelect("account.transactions", "transactions")
      .where("account.nuban=:nuban", { nuban })
      .getOne();

    return transactions;
  }
}
