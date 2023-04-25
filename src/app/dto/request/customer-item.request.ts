import { IsDefined, IsNotEmpty } from "class-validator";
import { AccountType } from "../../data/entities/account.entity";

export class CustomerRequest {
  @IsDefined()
  @IsNotEmpty()
  first_name: string;
  @IsDefined()
  @IsNotEmpty()
  last_name: string;
  @IsDefined()
  @IsNotEmpty()
  city: string;
  @IsDefined()
  @IsNotEmpty()
  country: string;
  @IsDefined()
  @IsNotEmpty()
  state: string;

  type?: AccountType;

  accountNumber?: number;
}
