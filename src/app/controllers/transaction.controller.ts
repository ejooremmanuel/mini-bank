import { Post, RequestBody, RestController } from "@matchmakerjs/matchmaker";
import { TransactionService } from "../services/transaction.service";
import { TransactionRequest } from "../dto/request/transaction.request";
import { Transaction } from "../data/entities/transaction.entity";
import { EntityManager } from "typeorm";
import { Account } from "../data/entities/account.entity";

@RestController("transaction")
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post("deposit")
  async deposit(
    @RequestBody() request: TransactionRequest
  ): Promise<Transaction> {
    const transaction =
      this.transactionService.createDepositTransaction(request);

    return transaction;
  }
  @Post("withdraw")
  async withdraw(
    @RequestBody() request: TransactionRequest
  ): Promise<Transaction> {
    const transaction =
      this.transactionService.createWithDrawTransaction(request);

    return transaction;
  }
  @Post("history")
  async history(
    @RequestBody() request: TransactionRequest
  ): Promise<Account[]> {
    const transactions = this.transactionService.getAccountTransactions(
      request.nuban
    );

    return transactions;
  }
}
