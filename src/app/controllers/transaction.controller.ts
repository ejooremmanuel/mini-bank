import {
  Get,
  PathParameter,
  Post,
  RequestBody,
  RestController,
  Valid,
} from "@matchmakerjs/matchmaker";
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
    @RequestBody() @Valid() request: TransactionRequest
  ): Promise<Transaction> {
    const transaction =
      this.transactionService.createDepositTransaction(request);

    return transaction;
  }
  @Post("withdraw")
  async withdraw(
    @RequestBody() @Valid() request: TransactionRequest
  ): Promise<Transaction> {
    const transaction =
      this.transactionService.createWithDrawTransaction(request);

    return transaction;
  }
  @Get("history/:nuban")
  async history(@PathParameter("nuban") nuban: number): Promise<Account> {
    const transactions = this.transactionService.getAccountTransactions(nuban);

    return transactions;
  }
}
