import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsDefined,
  IsNotEmpty,
  ValidateNested,
} from "class-validator";
import { OrderItemApiRequest } from "./order-item.request";

export class OrderApiRequest {
  @IsDefined()
  @IsNotEmpty()
  customerId: string;

  @ValidateNested()
  @Type(() => OrderItemApiRequest)
  @IsDefined()
  @ArrayNotEmpty()
  items: OrderItemApiRequest[];
}
