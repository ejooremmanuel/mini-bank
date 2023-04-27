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
  QueryParameter,
  Query,
} from "@matchmakerjs/matchmaker";
import { Customer } from "../data/entities/cutomer.entity";
import { IncomingMessage, ServerResponse } from "http";
import { CustomerRequest } from "../dto/request/customer-item.request";
import { AdditionalAccountRequest } from "../dto/request/additional-account.request";
import { IsInt } from "class-validator";
import { SearchResult } from "../dto/request/search-result";
import { PageRequest } from "../dto/request/page-request";
import { ApiResponse } from "../dto/response/api.response";

@RestController("customer")
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post("")
  async createCustomer(
    context: HandlerContext<IncomingMessage, ServerResponse>,
    @RequestBody() @Valid() request: CustomerRequest
  ): Promise<unknown> {
    const data = await this.customerService.saveCustomerData(request);
    return { data, message: "customer created", success: true };
  }
  @Get("details/:accountNumber")
  async getDetails(
    context: HandlerContext<IncomingMessage, ServerResponse>,
    @PathParameter("accountNumber")
    nuban: number
  ) {
    const data = await this.customerService.getAccountDetails(nuban);
    return {
      data,
      success: true,
    };
  }
  @Put("details/:customerId")
  async update(
    context: HandlerContext<IncomingMessage, ServerResponse>,
    @PathParameter("customerId") customerId: number,
    @RequestBody() @Valid() data: CustomerRequest
  ): Promise<ApiResponse<number>> {
    const res = await this.customerService.updateCustomer(data, customerId);
    return {
      data: res,
      success: true,
      message: "Customer updated successfully",
    };
  }
  @Put("account-details/:customerId")
  async additionalAccount(
    context: HandlerContext<IncomingMessage, ServerResponse>,
    @PathParameter("customerId") customerId: number,
    @RequestBody() @Valid() data: AdditionalAccountRequest
  ): Promise<ApiResponse<number>> {
    const res = await this.customerService.createAdditionalAccount(
      data.type,
      customerId
    );
    return {
      data: customerId,
      success: true,
    };
  }
  @Get("all")
  async allCustomers(
    context: HandlerContext<IncomingMessage, ServerResponse>,
    @Query() query: PageRequest
  ): Promise<SearchResult<Customer>> {
    query.limit = PageRequest.getLimit(query.limit, 10);

    query.offset = PageRequest.getOffset(query.offset);

    const res = await this.customerService.getAllCustomers(query);
    const count = await this.customerService.getAllCustomersCount();
    return {
      limit: query.limit,
      offset: query.offset,
      results: res,
      total: PageRequest.computeTotal(query.limit, query.offset, count),
    };
  }
}
