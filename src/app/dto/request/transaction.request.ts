import { IsDefined, Min } from "class-validator";
import { TransactionType } from "../../data/entities/transaction.entity";

export class TransactionRequest {
  @IsDefined()
  type: TransactionType;
  @IsDefined()
  nuban: number;
  @IsDefined()
  @Min(1)
  amount: number;
}
