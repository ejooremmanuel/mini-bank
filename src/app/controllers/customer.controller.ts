import { CustomerService } from "../services/customer.service";
import {
  Get,
  HandlerContext,
  Post,
  RequestBody,
  RestController,
  Valid,
  PathParameter,
  Put,
} from "@matchmakerjs/matchmaker";
import { Customer } from "../data/entities/cutomer.entity";
import { IncomingMessage, ServerResponse } from "http";
import { CustomerRequest } from "../dto/request/customer-item.request";
import { AdditionalAccountRequest } from "../dto/request/additional-account.request";

@RestController("customer")
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post("")
  async createCustomer(
    context: HandlerContext<IncomingMessage, ServerResponse>,
    @RequestBody() @Valid() request: CustomerRequest
  ): Promise<Customer> {
    const data = this.customerService.saveCustomer(request);
    return data;
  }
  @Get("details/:accountNumber")
  async getDetails(
    context: HandlerContext<IncomingMessage, ServerResponse>,

    @PathParameter("accountNumber") @Valid() nuban: number
  ): Promise<Customer> {
    const data = this.customerService.getAccountDetails(nuban);
    return data;
  }
  @Put("details/:customerId")
  async update(
    context: HandlerContext<IncomingMessage, ServerResponse>,
    @PathParameter("customerId") customerId: string,
    @RequestBody() @Valid() data: CustomerRequest
  ): Promise<number> {
    const res = this.customerService.updateCustomer(data, parseInt(customerId));
    return res;
  }
  @Put("account-details/:customerId")
  async additionalAccount(
    context: HandlerContext<IncomingMessage, ServerResponse>,
    @PathParameter("customerId") customerId: string,
    @RequestBody() @Valid() data: AdditionalAccountRequest
  ): Promise<Customer> {
    const res = this.customerService.createAdditionalAccount(
      data.type,
      parseInt(customerId)
    );
    return res;
  }
}
