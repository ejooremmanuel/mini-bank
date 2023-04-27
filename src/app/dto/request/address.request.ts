import { IsString } from "class-validator";

export class AddressRequest {
  @IsString()
  city: string;
  @IsString()
  country: string;
  @IsString()
  state: string;
}
