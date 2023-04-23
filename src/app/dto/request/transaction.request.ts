import {
  IsDefined,
  IsInt,
  IsNegative,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateIf,
} from "class-validator";
import { TransactionType } from "../../data/entities/transaction.entity";

export class TransactionRequest {
  @IsDefined()
  @IsString()
  type: TransactionType;
  @IsDefined()
  @IsInt()
  nuban: number;

  @IsDefined()
  @IsNotEmpty()
  @Min(1)
  amount: number;
}
