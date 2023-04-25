import { Injectable } from "@matchmakerjs/di";
import { EntityManager } from "typeorm";
import {
  Transaction,
  TransactionType,
} from "../data/entities/transaction.entity";
import { TransactionRequest } from "../dto/request/transaction.request";
import { Account } from "../data/entities/account.entity";
import { ErrorResponse } from "@matchmakerjs/matchmaker";
import { Transactional } from "@matchmakerjs/matchmaker-typeorm";

@Injectable()
export class TransactionService {
  constructor(private entityManager: EntityManager) {}

  @Transactional()
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

    if (accountData.limit === accountData.currentBalance) {
      throw new ErrorResponse(404, {
        message: "account has reached its limit",
      });
    }

    accountData.currentBalance += data.amount;

    const transaction = new Transaction();
    transaction.account = accountData;
    transaction.type = TransactionType.Deposit;
    transaction.balance = accountData.currentBalance;
    transaction.amount = data.amount;

    return this.entityManager.save(transaction);
  }

  @Transactional()
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

    if (
      accountData.currentBalance === 0 ||
      accountData.currentBalance < data.amount
    ) {
      throw new ErrorResponse(400, {
        message: "balance insufficient",
      });
    }

    accountData.currentBalance -= data.amount;

    const transaction = new Transaction();
    transaction.account = accountData;
    transaction.type = TransactionType.Withdrawal;
    transaction.balance = accountData.currentBalance;
    transaction.amount = data.amount;

    return this.entityManager.save(transaction);
  }

  @Transactional()
  async getAccountTransactions(nuban: number): Promise<Account> {
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
    const transactions = this.entityManager
      .createQueryBuilder(Account, "account")
      .leftJoinAndSelect("account.transactions", "transactions")
      .where("account.nuban=:nuban", { nuban })
      .getOne();

    return transactions;
  }
}
