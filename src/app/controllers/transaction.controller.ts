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
  ): Promise<unknown> {
    const transaction =
      this.transactionService.createDepositTransaction(request);

    return { data: transaction, success: true };
  }
  @Post("withdraw")
  async withdraw(
    @RequestBody() @Valid() request: TransactionRequest
  ): Promise<unknown> {
    const transaction =
      this.transactionService.createWithDrawTransaction(request);

    return { data: transaction, success: true };
  }
  @Get("history/:nuban")
  async history(@PathParameter("nuban") nuban: number): Promise<unknown> {
    const transactions = this.transactionService.getAccountTransactions(nuban);

    return { data: transactions, success: true };
  }
}
