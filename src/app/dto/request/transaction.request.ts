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

  @IsNegative({
    message(validationArguments) {
      if (validationArguments.value < 0) return "Not allowed";
    },
  })
  @Min(1)
  @IsDefined()
  @IsNotEmpty()
  amount: number;
}
