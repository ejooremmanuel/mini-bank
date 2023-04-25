import { IsDefined, IsNotEmpty } from "class-validator";
import { AccountType } from "../../data/entities/account.entity";

export class AdditionalAccountRequest {
  @IsDefined()
  @IsNotEmpty()
  type?: AccountType;
}
