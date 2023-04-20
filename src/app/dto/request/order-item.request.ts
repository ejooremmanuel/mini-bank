import { IsDefined, IsNotEmpty, Min } from "class-validator";

export class OrderItemApiRequest {
  @IsDefined()
  @IsNotEmpty()
  productId: string;

  @IsDefined()
  @IsNotEmpty()
  @Min(0.01)
  amount: number;
}
