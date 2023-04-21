import { IsDefined, IsNotEmpty } from "class-validator";

export class CustomerRequest {
  @IsDefined()
  @IsNotEmpty()
  name: string;

  accountNumber: number;
}
