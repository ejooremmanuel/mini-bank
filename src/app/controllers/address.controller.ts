import {
  PathParameter,
  Put,
  RequestBody,
  RestController,
  Valid,
} from "@matchmakerjs/matchmaker";
import { AddressService } from "../services/address.service";
import { AddressRequest } from "../dto/request/address.request";
import { ApiResponse } from "../dto/response/api.response";

@RestController("address")
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Put("/:addressId")
  async updateAddress(
    @RequestBody() @Valid() body: AddressRequest,
    @PathParameter("addressId") addressId: number
  ): Promise<ApiResponse<number>> {
    const res = await this.addressService.updateAddress(addressId, body);
    return {
      success: true,
      data: res,
      message: "Customer address updated successfully",
    };
  }
}
